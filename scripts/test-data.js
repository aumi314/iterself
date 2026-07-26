const assert = require('node:assert');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const { createStore, startOfWeekIso } = require('../src/main/store');
const { createExportBundle, minutesBetween, isFocusCategory, getCategoryPath, getTaskPath } = require('../src/main/exporter');

async function withTempDir(run) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iterself-test-'));
  try {
    await run(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

async function testStoreLifecycle() {
  await withTempDir(async (dir) => {
    const store = await createStore(dir);
    const initial = await store.getData();
    assert.ok(initial.eventCategories.length > 0, 'seed categories exist');
    assert.ok(initial.tasks.length > 0, 'seed tasks exist');
    assert.equal(initial.okrCycles.length, 0, 'new data has no OKR cycle layer');
    assert.ok(initial.objectives.every((objective) => objective.startDate && objective.endDate), 'objectives own date ranges');
    assert.deepEqual(initial.settings, { timezone: 'system', language: 'zh-CN', theme: 'system' }, 'default settings exist');

    const afterSettings = await store.mutate({
      type: 'setSettings',
      patch: { timezone: 'Asia/Shanghai', language: 'en', theme: 'dark' },
    });
    assert.deepEqual(afterSettings.settings, { timezone: 'Asia/Shanghai', language: 'en', theme: 'dark' }, 'settings update');

    // upsert a task
    const afterUpsert = await store.mutate({
      type: 'upsert',
      collection: 'tasks',
      item: { title: 'Test task', status: 'active', parentId: null, estimatedMinutes: 30, note: '' },
    });
    const created = afterUpsert.tasks.find((task) => task.title === 'Test task');
    assert.ok(created, 'task created');
    assert.ok(created.id, 'task received id');

    // patch it
    const afterPatch = await store.mutate({ type: 'patch', collection: 'tasks', id: created.id, patch: { status: 'done' } });
    assert.equal(afterPatch.tasks.find((task) => task.id === created.id).status, 'done', 'task patched');
    const afterReopen = await store.mutate({ type: 'patch', collection: 'tasks', id: created.id, patch: { status: 'doing' } });
    assert.equal(afterReopen.tasks.find((task) => task.id === created.id).status, 'doing', 'completed task can return to doing');

    // reorder siblings and change hierarchy
    const project = initial.tasks.find((task) => task.parentId === null);
    const [firstChild, secondChild] = initial.tasks.filter((task) => task.parentId === project.id);
    const afterReorder = await store.mutate({ type: 'moveTask', taskId: secondChild.id, targetId: firstChild.id, position: 'before' });
    assert.ok(
      afterReorder.tasks.find((task) => task.id === secondChild.id).sortOrder < afterReorder.tasks.find((task) => task.id === firstChild.id).sortOrder,
      'task sibling order changed'
    );
    const afterMove = await store.mutate({ type: 'moveTask', taskId: firstChild.id, targetId: secondChild.id, position: 'inside' });
    assert.equal(afterMove.tasks.find((task) => task.id === firstChild.id).parentId, secondChild.id, 'task parent changed');
    await assert.rejects(
      () => store.mutate({ type: 'moveTask', taskId: secondChild.id, targetId: firstChild.id, position: 'inside' }),
      /own descendant/,
      'moving a task into its descendant is blocked'
    );

    // deleting a referenced task must fail
    const referencedTask = initial.tasks.find((task) => initial.weeklyTaskBindings.some((binding) => binding.taskId === task.id));
    assert.ok(referencedTask, 'seed has referenced task');
    await assert.rejects(
      () => store.mutate({ type: 'delete', collection: 'tasks', id: referencedTask.id }),
      /Cannot delete task/,
      'referenced task delete blocked'
    );

    // deleting unreferenced task works
    const afterDelete = await store.mutate({ type: 'delete', collection: 'tasks', id: created.id });
    assert.ok(!afterDelete.tasks.some((task) => task.id === created.id), 'unreferenced task deleted');

    // deleting a category used by a time entry must fail
    const focusCategory = initial.eventCategories.find((category) => category.parentId === null);
    const withEntry = await store.mutate({
      type: 'upsert',
      collection: 'timeEntries',
      item: { date: '2026-07-07', start: '09:00', end: '10:00', categoryId: focusCategory.id, taskId: null, dailyBindingId: null, note: 'test' },
    });
    assert.equal(withEntry.timeEntries.length, 1, 'time entry created');
    await assert.rejects(
      () => store.mutate({ type: 'delete', collection: 'eventCategories', id: focusCategory.id }),
      /Cannot delete category/,
      'referenced category delete blocked'
    );

    // persistence across store instances
    const store2 = await createStore(dir);
    const reread = await store2.getData();
    assert.equal(reread.timeEntries.length, 1, 'data persists across restarts');
    assert.equal(reread.settings.theme, 'dark', 'settings persist across restarts');
  });
}

async function testLegacyOkrMigration() {
  await withTempDir(async (dir) => {
    const store = await createStore(dir);
    const legacy = await store.getData();
    legacy.okrCycles = [{
      id: 'legacy-cycle',
      title: 'Legacy cycle',
      startDate: '2026-06-20',
      endDate: '2026-07-20',
      planDoc: 'legacy plan',
      reviewDoc: 'legacy review',
    }];
    legacy.objectives = [{ id: 'legacy-objective', cycleId: 'legacy-cycle', title: 'Legacy objective', description: '' }];
    legacy.keyResults = [];
    legacy.monthlyPlans = [];
    const migrated = await store.replace(legacy);
    assert.equal(migrated.objectives[0].startDate, '2026-06-20', 'legacy objective inherits cycle start');
    assert.equal(migrated.objectives[0].endDate, '2026-07-20', 'legacy objective inherits cycle end');
    const monthPlan = migrated.documents.find((doc) => doc.scope === 'month' && doc.key === '2026-06' && doc.type === 'plan');
    const monthReview = migrated.documents.find((doc) => doc.scope === 'month' && doc.key === '2026-06' && doc.type === 'review');
    assert.equal(monthPlan?.content, 'legacy plan', 'legacy month plan lands in documents');
    assert.equal(monthReview?.content, 'legacy review', 'legacy month review lands in documents');
    assert.equal(migrated.monthlyPlans.length, 0, 'legacy monthlyPlans collection is emptied');
  });
}

async function testDocumentUnification() {
  await withTempDir(async (dir) => {
    const store = await createStore(dir);
    const initial = await store.getData();
    assert.equal(initial.dailyPlans.length + initial.weeklyPlans.length + initial.visionDocuments.length, 0, 'legacy doc collections start empty');
    assert.ok(initial.documents.some((doc) => doc.scope === 'vision' && doc.type === 'free'), 'seed vision document exists');
    assert.ok(initial.documents.some((doc) => doc.scope === 'day' && doc.type === 'plan'), 'seed day plan document exists');

    // A legacy v2 shape migrates fully into documents.
    const legacy = JSON.parse(JSON.stringify(initial));
    legacy.version = 2;
    legacy.documents = [];
    legacy.dailyPlans = [
      { date: '2026-07-20', planDoc: 'day plan text', reviewDoc: '', createdAt: '2026-07-20T00:00:00.000Z', updatedAt: '2026-07-20T00:00:00.000Z' },
      { date: '2026-07-21', planDoc: '', reviewDoc: '', reviewDocCreated: true },
    ];
    legacy.weeklyPlans = [{ id: 'w1', weekStart: '2026-07-20', planDoc: 'week plan text', reviewDoc: 'week review text' }];
    legacy.monthlyPlans = [{ id: 'm1', month: '2026-07', planDoc: 'month plan text', reviewDoc: '' }];
    legacy.visionDocuments = [{ id: 'vision_legacy', title: 'North star', content: 'vision text', createdAt: '2026-07-01T00:00:00.000Z', updatedAt: '2026-07-01T00:00:00.000Z' }];
    const migrated = await store.replace(legacy);

    const byKey = (scope, key, type) => migrated.documents.find((doc) => doc.scope === scope && doc.key === key && doc.type === type);
    assert.equal(byKey('day', '2026-07-20', 'plan')?.content, 'day plan text', 'day plan migrates');
    assert.ok(!byKey('day', '2026-07-20', 'review'), 'untouched empty review is not materialized');
    assert.equal(byKey('day', '2026-07-21', 'review')?.content, '', 'explicitly created empty doc survives as a row');
    assert.equal(byKey('week', '2026-07-20', 'plan')?.content, 'week plan text', 'week plan migrates');
    assert.equal(byKey('week', '2026-07-20', 'review')?.content, 'week review text', 'week review migrates');
    assert.equal(byKey('month', '2026-07', 'plan')?.content, 'month plan text', 'month plan migrates');
    const vision = migrated.documents.find((doc) => doc.id === 'vision_legacy');
    assert.equal(vision?.content, 'vision text', 'vision doc migrates keeping its id');
    assert.equal(vision?.title, 'North star', 'vision title preserved');
    assert.equal(
      migrated.dailyPlans.length + migrated.weeklyPlans.length + migrated.monthlyPlans.length + migrated.visionDocuments.length,
      0,
      'legacy collections emptied after migration'
    );
    assert.equal(migrated.version, 3, 'data version bumped to 3');

    // Migration is idempotent across reloads.
    const store2 = await createStore(dir);
    const reread = await store2.getData();
    assert.equal(reread.documents.filter((doc) => doc.scope === 'day' && doc.key === '2026-07-20').length, 1, 'no duplicate documents on reload');

    // Cycle docs are singletons per (scope, key, type); vision docs may repeat.
    await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'day', key: '2026-07-22', type: 'plan', content: 'v1' } });
    let next = await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'day', key: '2026-07-22', type: 'plan', content: 'v2' } });
    const dayDocs = next.documents.filter((doc) => doc.scope === 'day' && doc.key === '2026-07-22' && doc.type === 'plan');
    assert.equal(dayDocs.length, 1, 'cycle doc upsert dedupes on scope+key+type');
    assert.equal(dayDocs[0].content, 'v2', 'latest content wins');
    await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'vision', key: null, type: 'free', title: 'A', content: 'a' } });
    next = await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'vision', key: null, type: 'free', title: 'B', content: 'b' } });
    assert.ok(next.documents.filter((doc) => doc.scope === 'vision').length >= 3, 'vision documents coexist as a pool');

    // v1 Sunday week starts heal to Monday; occupied slots are never overwritten.
    const sunday = JSON.parse(JSON.stringify(next));
    sunday.weeklyTaskBindings = [{ id: 'wb1', weekStart: '2026-07-05', taskId: sunday.tasks[0].id, createdAt: '2026-07-05T00:00:00.000Z', updatedAt: '2026-07-05T00:00:00.000Z' }];
    sunday.documents = sunday.documents.filter((doc) => doc.scope !== 'week').concat([
      { id: 'wsun_plan', scope: 'week', key: '2026-07-05', type: 'plan', title: '', content: 'sunday plan', createdAt: '2026-07-05T00:00:00.000Z', updatedAt: '2026-07-05T00:00:00.000Z' },
      { id: 'wmon_plan', scope: 'week', key: '2026-07-06', type: 'plan', title: '', content: 'monday plan', createdAt: '2026-07-06T00:00:00.000Z', updatedAt: '2026-07-06T00:00:00.000Z' },
      { id: 'wsun_rev', scope: 'week', key: '2026-07-05', type: 'review', title: '', content: 'sunday review', createdAt: '2026-07-05T00:00:00.000Z', updatedAt: '2026-07-05T00:00:00.000Z' },
    ]);
    const healed = await store.replace(sunday);
    assert.equal(healed.weeklyTaskBindings[0].weekStart, '2026-07-06', 'sunday binding heals to monday');
    assert.equal(healed.documents.find((doc) => doc.id === 'wsun_plan').key, '2026-07-05', 'occupied slot: doc stays put rather than overwrite');
    assert.equal(healed.documents.find((doc) => doc.id === 'wmon_plan').content, 'monday plan', 'existing monday doc untouched');
    assert.equal(healed.documents.find((doc) => doc.id === 'wsun_rev').key, '2026-07-06', 'free slot: sunday review moves to monday');
  });
}

async function testExportBundle() {
  await withTempDir(async (dir) => {
    const store = await createStore(dir);
    let data = await store.getData();

    const category = data.eventCategories.find((item) => item.name === 'Deep Work') || data.eventCategories[0];
    const task = data.tasks.find((item) => item.parentId) || data.tasks[0];
    data = await store.mutate({
      type: 'upsert',
      collection: 'timeEntries',
      item: { date: data.meta.activeDate, start: '08:00', end: '09:30', categoryId: category.id, taskId: task.id, dailyBindingId: null, note: 'morning block' },
    });
    data = await store.mutate({
      type: 'upsert',
      collection: 'insights',
      item: { timestamp: `${data.meta.activeDate}T10:15:00.000Z`, date: data.meta.activeDate, content: 'Test insight for export' },
    });

    const exportTarget = path.join(dir, 'exports');
    await fs.mkdir(exportTarget, { recursive: true });
    const result = await createExportBundle(data, exportTarget, {});

    assert.ok(result.outDir.includes('iterself-export-'), 'export dir named');
    const files = await fs.readdir(result.outDir);
    assert.deepEqual(files.sort(), ['data.json', 'review-bundle.md', 'tasks.csv', 'time-records.csv'], 'all export files exist');

    const markdown = await fs.readFile(path.join(result.outDir, 'review-bundle.md'), 'utf8');
    assert.ok(markdown.includes('# IterSelf Export'), 'markdown has header');
    assert.ok(markdown.includes('morning block'), 'markdown includes time entry note');
    assert.ok(markdown.includes('Test insight for export'), 'markdown includes insight');

    const csv = await fs.readFile(path.join(result.outDir, 'time-records.csv'), 'utf8');
    assert.ok(csv.split('\n').length >= 2, 'time csv has data row');
    assert.ok(csv.includes('90'), 'csv contains computed minutes');
  });
}

function testPureHelpers() {
  assert.equal(minutesBetween('09:00', '10:30'), 90, 'minutesBetween normal');
  assert.equal(minutesBetween('23:30', '00:30'), 60, 'minutesBetween across midnight');
  assert.equal(minutesBetween('bad', '10:00'), 0, 'minutesBetween invalid input');

  const categories = [
    { id: 'a', parentId: null, name: 'Work', focus: true },
    { id: 'b', parentId: 'a', name: 'Meetings' },
  ];
  assert.equal(isFocusCategory(categories, 'b'), true, 'focus inherits from parent when child has no flag');
  assert.equal(getCategoryPath(categories, 'b'), 'Work / Meetings', 'category path builds');

  const tasks = [
    { id: 't1', parentId: null, title: 'Project' },
    { id: 't2', parentId: 't1', title: 'Subtask' },
  ];
  assert.equal(getTaskPath(tasks, 't2'), 'Project / Subtask', 'task path builds');

  assert.equal(startOfWeekIso('2026-07-07'), '2026-07-06', 'Tuesday maps to Monday week start');
  assert.equal(startOfWeekIso('2026-07-05'), '2026-06-29', 'Sunday maps back to previous Monday');
}

async function testDataSafety() {
  await withTempDir(async (dir) => {
    const dataPath = path.join(dir, 'data', 'iterself-data.json');
    const bakPath = `${dataPath}.bak`;

    // Seed plus two mutations so .bak holds a meaningful previous version.
    let store = await createStore(dir);
    await store.getData();
    await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'vision', key: null, type: 'free', title: 'Safety A', content: 'a' } });
    await store.mutate({ type: 'upsert', collection: 'documents', item: { scope: 'vision', key: null, type: 'free', title: 'Safety B', content: 'b' } });

    const bak = JSON.parse(await fs.readFile(bakPath, 'utf8'));
    assert.ok(bak.documents.some((doc) => doc.title === 'Safety A'), 'bak keeps the previous version');
    assert.ok(!bak.documents.some((doc) => doc.title === 'Safety B'), 'bak stays one write behind');
    const dataFiles = await fs.readdir(path.join(dir, 'data'));
    assert.ok(!dataFiles.some((name) => name.endsWith('.tmp')), 'no tmp residue after writes');

    // Corrupt the main file: a new store must quarantine it and restore from bak.
    await fs.writeFile(dataPath, 'not json {{{', 'utf8');
    store = await createStore(dir);
    const recovered = await store.getData();
    assert.ok(recovered.documents.some((doc) => doc.title === 'Safety A'), 'recovery restores bak content');
    assert.ok(!recovered.documents.some((doc) => doc.title === 'Safety B'), 'recovery is one write behind by design');
    const afterRecovery = await fs.readdir(path.join(dir, 'data'));
    const quarantine = afterRecovery.find((name) => name.includes('corrupt'));
    assert.ok(quarantine, 'corrupt file is preserved');
    assert.equal(await fs.readFile(path.join(dir, 'data', quarantine), 'utf8'), 'not json {{{', 'quarantined bytes untouched');

    // Missing main file with a valid bak restores instead of reseeding.
    await fs.rm(dataPath, { force: true });
    store = await createStore(dir);
    const restored = await store.getData();
    assert.ok(restored.documents.some((doc) => doc.title === 'Safety A'), 'missing file restores from bak');

    // Corrupt main and no bak: quarantine and reseed without throwing.
    await fs.writeFile(dataPath, '###', 'utf8');
    await fs.rm(bakPath, { force: true });
    store = await createStore(dir);
    const reseeded = await store.getData();
    assert.ok(reseeded.eventCategories.length > 0, 'reseeds when nothing is recoverable');

    // Concurrent mutations must all land (serialized read-modify-write).
    store = await createStore(dir);
    await Promise.all(Array.from({ length: 10 }, (_, index) => store.mutate({
      type: 'upsert',
      collection: 'insights',
      item: { timestamp: `2026-07-07T0${index % 10}:00:00.000Z`, date: '2026-07-07', content: `concurrent-${index}` },
    })));
    const finalStore = await createStore(dir);
    const final = await finalStore.getData();
    for (let index = 0; index < 10; index += 1) {
      assert.ok(final.insights.some((entry) => entry.content === `concurrent-${index}`), `concurrent mutation ${index} persisted`);
    }
  });
}

async function testAutoBackupRotation() {
  await withTempDir(async (dir) => {
    const autoDir = path.join(dir, 'backups', 'auto');
    await fs.mkdir(autoDir, { recursive: true });
    for (let index = 1; index <= 20; index += 1) {
      const day = String(index).padStart(2, '0');
      await fs.writeFile(path.join(autoDir, `iterself-auto-2020-01-${day}.json`), '{}', 'utf8');
    }

    const store = await createStore(dir);
    await store.getData(); // seed write creates today's snapshot and prunes

    const files = (await fs.readdir(autoDir)).filter((name) => name.startsWith('iterself-auto-')).sort();
    assert.equal(files.length, 14, 'auto backups pruned to keep limit');
    assert.ok(!files.includes('iterself-auto-2020-01-01.json'), 'oldest snapshots removed');
    const todaySnapshot = JSON.parse(await fs.readFile(path.join(autoDir, files[files.length - 1]), 'utf8'));
    assert.ok(Array.isArray(todaySnapshot.tasks), 'snapshot is valid data JSON');
  });
}

async function main() {
  testPureHelpers();
  await testStoreLifecycle();
  await testLegacyOkrMigration();
  await testDocumentUnification();
  await testDataSafety();
  await testAutoBackupRotation();
  await testExportBundle();
  console.log('All data-layer tests passed.');
}

main().catch((error) => {
  console.error('TEST FAILED');
  console.error(error);
  process.exit(1);
});
