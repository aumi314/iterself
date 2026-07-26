const path = require('node:path');
const fs = require('node:fs/promises');

const DATA_VERSION = 2;
const AUTO_BACKUP_KEEP = 14;

function nowIso() {
  return new Date().toISOString();
}

function toLocalDateIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayIso() {
  return toLocalDateIso(new Date());
}

function startOfWeekIso(dateString = todayIso()) {
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return toLocalDateIso(date);
}

function id(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function createInitialData() {
  const createdAt = nowIso();
  const today = todayIso();
  const weekStart = startOfWeekIso(today);

  const work = id('cat');
  const workDeep = id('cat');
  const learning = id('cat');
  const health = id('cat');
  const life = id('cat');
  const leisure = id('cat');

  const project = id('task');
  const design = id('task');
  const review = id('task');

  const objective = id('obj');
  const kr = id('kr');

  return {
    version: DATA_VERSION,
    meta: {
      createdAt,
      updatedAt: createdAt,
      activeDate: today,
      activeWeekStart: weekStart,
    },
    eventCategories: [
      { id: work, parentId: null, name: 'Work', focus: true, color: '#4568dc', createdAt, updatedAt: createdAt },
      { id: workDeep, parentId: work, name: 'Deep Work', focus: true, color: '#4568dc', createdAt, updatedAt: createdAt },
      { id: learning, parentId: null, name: 'Learning', focus: true, color: '#7a5cff', createdAt, updatedAt: createdAt },
      { id: health, parentId: null, name: 'Health', focus: false, color: '#16a34a', createdAt, updatedAt: createdAt },
      { id: life, parentId: null, name: 'Life Admin', focus: false, color: '#f59e0b', createdAt, updatedAt: createdAt },
      { id: leisure, parentId: null, name: 'Leisure', focus: false, color: '#94a3b8', createdAt, updatedAt: createdAt },
    ],
    tasks: [
      { id: project, parentId: null, sortOrder: 0, title: 'Build IterSelf MVP', status: 'doing', estimatedMinutes: 1800, tags: 'product, mvp', priority: 'important_not_urgent', note: 'Example task pool project. Replace it with your own.', createdAt, updatedAt: createdAt },
      { id: design, parentId: project, sortOrder: 0, title: 'Design core data model', status: 'doing', estimatedMinutes: 240, tags: 'model', priority: 'important_not_urgent', note: '', createdAt, updatedAt: createdAt },
      { id: review, parentId: project, sortOrder: 1, title: 'Run a full week review', status: 'doing', estimatedMinutes: 60, tags: 'review', priority: 'important_not_urgent', note: '', createdAt, updatedAt: createdAt },
    ],
    okrCycles: [],
    objectives: [
      { id: objective, title: 'Make IterSelf useful for real daily planning and review', startDate: today, endDate: addDays(today, 30), description: 'A sample objective. Replace with your own medium-cycle direction.', createdAt, updatedAt: createdAt },
    ],
    keyResults: [
      { id: kr, objectiveId: objective, title: 'Complete 7 daily reviews and 1 weekly review', note: 'Sample key result note.', type: 'count', targetValue: 8, currentValue: 0, unit: 'reviews', createdAt, updatedAt: createdAt },
    ],
    weeklyPlans: [
      { id: id('week'), weekStart, planDoc: '# Weekly Plan\n\n## Strategic tasks\n\n- Choose from the task pool.\n\n## Resource estimate\n\n', reviewDoc: '# Weekly Review\n\n## Recognize reality\n\n## Analyze and improve\n\n', createdAt, updatedAt: createdAt },
    ],
    weeklyTaskBindings: [
      { id: id('wt'), weekStart, taskId: design, createdAt, updatedAt: createdAt },
    ],
    dailyPlans: [
      { date: today, planDoc: '# Daily Plan\n\n## Today\n\n', reviewDoc: '# Daily Review\n\n## Recognize reality\n\n## Analyze and improve\n\n', createdAt, updatedAt: createdAt },
    ],
    dailyTaskBindings: [
      { id: id('dt'), date: today, taskId: design, createdAt, updatedAt: createdAt },
    ],
    monthlyPlans: [],
    scheduleBlocks: [],
    timeEntries: [],
    insights: [],
    visionDocuments: [
      { id: id('vision'), title: 'Vision seed', content: '# Vision\n\nWhat kind of person do I want to become? What do I want to create? What contribution do I want to make?\n', createdAt, updatedAt: createdAt },
    ],
    templates: {
      dayPlan: '# Daily Plan\n\n## Today\n\n',
      dayReview: '# Daily Review\n\n## Recognize reality\n\n- Focus time: {{focusTime}}\n- Tasks: {{taskSummary}}\n\n### Insights\n{{insights}}\n\n## Analyze and improve\n\n',
      weekPlan: '# Weekly Plan\n\n## Strategic tasks\n\n## Rough allocation\n\n',
      weekReview: '# Weekly Review\n\n## Recognize reality\n\n- Focus time: {{focusTime}}\n- Planned vs actual: {{plannedVsActual}}\n\n## Analyze and improve\n\n',
      monthPlan: '# Monthly OKR Plan\n\n## Objectives\n\n',
      monthReview: '# Monthly Review\n\n## OKR reality\n\n## Analysis and iteration\n\n',
    },
    settings: {
      timezone: 'system',
      language: 'zh-CN',
      theme: 'system',
    },
  };
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toLocalDateIso(date);
}

function ensureArrays(data) {
  const fallback = createInitialData();
  const keys = [
    'eventCategories',
    'tasks',
    'okrCycles',
    'objectives',
    'keyResults',
    'weeklyPlans',
    'weeklyTaskBindings',
    'dailyPlans',
    'dailyTaskBindings',
    'monthlyPlans',
    'scheduleBlocks',
    'timeEntries',
    'insights',
    'visionDocuments',
  ];
  for (const key of keys) {
    if (!Array.isArray(data[key])) data[key] = fallback[key] || [];
  }
  if (!data.templates) data.templates = fallback.templates;
  if (!data.meta) data.meta = fallback.meta;
  data.settings = {
    ...fallback.settings,
    ...(data.settings || {}),
  };
  const legacyCycleMap = new Map(data.okrCycles.map((cycle) => [cycle.id, cycle]));
  data.objectives = data.objectives.map((objective) => {
    const legacyCycle = legacyCycleMap.get(objective.cycleId);
    return {
      ...objective,
      startDate: objective.startDate || legacyCycle?.startDate || todayIso(),
      endDate: objective.endDate || legacyCycle?.endDate || addDays(todayIso(), 30),
    };
  });
  if (!data.monthlyPlans.length) {
    data.monthlyPlans = data.okrCycles
      .filter((cycle) => cycle.planDoc || cycle.reviewDoc)
      .map((cycle) => ({
        id: `month:${cycle.startDate.slice(0, 7)}`,
        month: cycle.startDate.slice(0, 7),
        planDoc: cycle.planDoc || data.templates.monthPlan || '',
        reviewDoc: cycle.reviewDoc || data.templates.monthReview || '',
        createdAt: cycle.createdAt,
        updatedAt: cycle.updatedAt,
      }));
  }
  data.weeklyTaskBindings = data.weeklyTaskBindings.map((entry) => ({
    id: entry.id,
    weekStart: entry.weekStart,
    taskId: entry.taskId,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  }));
  data.dailyTaskBindings = data.dailyTaskBindings.map((entry) => ({
    id: entry.id,
    date: entry.date,
    taskId: entry.taskId,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  }));
  data.scheduleBlocks = data.scheduleBlocks.map((entry) => ({
    id: entry.id,
    date: entry.date,
    start: entry.start,
    end: entry.end,
    taskId: entry.taskId || null,
    title: entry.title || '',
    note: entry.note || '',
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  }));
  data.timeEntries = data.timeEntries.map((entry) => ({
    id: entry.id,
    date: entry.date,
    start: entry.start,
    end: entry.end,
    title: entry.title || '',
    categoryId: entry.categoryId || null,
    taskId: entry.taskId || null,
    note: entry.note || '',
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt,
  }));
  data.version = DATA_VERSION;
  return data;
}

async function createStore(userDataDir) {
  const dataDir = path.join(userDataDir, 'data');
  const dataPath = path.join(dataDir, 'iterself-data.json');
  const tmpPath = `${dataPath}.tmp`;
  const bakPath = `${dataPath}.bak`;
  const autoBackupDir = path.join(userDataDir, 'backups', 'auto');
  await fs.mkdir(dataDir, { recursive: true });

  // Every store operation runs through one queue so a read-modify-write can
  // never interleave with another and silently drop the earlier change.
  let opQueue = Promise.resolve();
  function serialized(operation) {
    const run = opQueue.then(operation, operation);
    opQueue = run.then(() => undefined, () => undefined);
    return run;
  }

  async function readJsonFile(filePath) {
    let text;
    try {
      text = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') return { missing: true };
      // Transient errors (locks, permissions) must not trigger recovery:
      // recovering over a merely-locked file would replace newer data.
      throw error;
    }
    try {
      return { ok: true, data: JSON.parse(text) };
    } catch (error) {
      return { corrupt: true };
    }
  }

  async function renameWithRetry(from, to) {
    for (let attempt = 0; ; attempt += 1) {
      try {
        return await fs.rename(from, to);
      } catch (error) {
        // Antivirus/indexers on Windows can hold the target briefly.
        if (attempt >= 2 || !['EPERM', 'EACCES', 'EBUSY'].includes(error.code)) throw error;
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      }
    }
  }

  async function refreshBak() {
    try {
      await fs.copyFile(dataPath, bakPath);
    } catch (error) {
      // The .bak refresh is best-effort: saving the user's current change
      // matters more than keeping the previous version.
      if (error.code !== 'ENOENT') console.warn(`iterself: could not refresh ${bakPath}: ${error.message}`);
    }
  }

  async function refreshAutoBackup(json) {
    try {
      const filePath = path.join(autoBackupDir, `iterself-auto-${todayIso()}.json`);
      try {
        await fs.access(filePath);
        return;
      } catch (error) {
        // No snapshot for today yet; create one below.
      }
      await fs.mkdir(autoBackupDir, { recursive: true });
      await fs.writeFile(filePath, json, 'utf8');
      const files = (await fs.readdir(autoBackupDir))
        .filter((name) => /^iterself-auto-\d{4}-\d{2}-\d{2}\.json$/.test(name))
        .sort();
      const excess = files.slice(0, Math.max(0, files.length - AUTO_BACKUP_KEEP));
      await Promise.all(excess.map((name) => fs.rm(path.join(autoBackupDir, name), { force: true })));
    } catch (error) {
      console.warn(`iterself: auto backup failed: ${error.message}`);
    }
  }

  async function read() {
    const main = await readJsonFile(dataPath);
    if (main.ok) {
      const previousVersion = main.data.version;
      const data = ensureArrays(main.data);
      if (previousVersion !== DATA_VERSION) return write(data);
      return data;
    }

    if (main.corrupt) {
      // Never discard user bytes: move the unreadable file aside, then recover.
      const stamp = nowIso().replace(/[:.]/g, '-');
      const quarantinePath = path.join(dataDir, `iterself-data.corrupt-${stamp}.json`);
      await fs.rename(dataPath, quarantinePath);
      console.error(`iterself: data file was unreadable; preserved at ${quarantinePath}`);
    }

    const bak = await readJsonFile(bakPath);
    if (bak.ok) {
      console.warn(`iterself: restoring data from ${bakPath}`);
      return write(bak.data);
    }

    return write(createInitialData());
  }

  async function write(data) {
    const next = ensureArrays(data);
    next.meta = next.meta || {};
    next.meta.updatedAt = nowIso();
    const json = JSON.stringify(next, null, 2);
    await fs.writeFile(tmpPath, json, 'utf8');
    await refreshBak();
    await renameWithRetry(tmpPath, dataPath);
    await refreshAutoBackup(json);
    return next;
  }

  async function getData() {
    return serialized(read);
  }

  async function replace(nextData) {
    return serialized(() => write(nextData));
  }

  async function mutate(mutation) {
    return serialized(() => applyMutation(mutation));
  }

  async function applyMutation(mutation) {
    const data = await read();
    const { type, collection, item, id: itemId, patch, key } = mutation || {};

    if (type === 'upsert') {
      if (!Array.isArray(data[collection])) throw new Error(`Unknown collection: ${collection}`);
      const nextItem = {
        ...item,
        id: item.id || id(prefixFor(collection)),
        createdAt: item.createdAt || nowIso(),
        updatedAt: nowIso(),
      };
      const index = data[collection].findIndex((entry) => entry.id === nextItem.id || entry.date === nextItem.date && collection === 'dailyPlans');
      if (index >= 0) data[collection][index] = { ...data[collection][index], ...nextItem, updatedAt: nowIso() };
      else data[collection].push(nextItem);
    }

    if (type === 'patch') {
      if (!Array.isArray(data[collection])) throw new Error(`Unknown collection: ${collection}`);
      const index = data[collection].findIndex((entry) => entry.id === itemId || (collection === 'dailyPlans' && entry.date === itemId));
      if (index < 0) throw new Error(`Item not found: ${collection}/${itemId}`);
      data[collection][index] = { ...data[collection][index], ...patch, updatedAt: nowIso() };
    }

    if (type === 'moveTask') {
      const task = data.tasks.find((entry) => entry.id === mutation.taskId);
      const target = data.tasks.find((entry) => entry.id === mutation.targetId);
      const position = mutation.position;
      if (!task || !target) throw new Error('Task not found.');
      if (task.id === target.id) throw new Error('A task cannot be moved onto itself.');
      if (!['before', 'inside', 'after'].includes(position)) throw new Error('Invalid task drop position.');

      const oldParentId = task.parentId || null;
      const nextParentId = position === 'inside' ? target.id : target.parentId || null;
      let ancestorId = nextParentId;
      while (ancestorId) {
        if (ancestorId === task.id) throw new Error('A task cannot be moved into its own descendant.');
        ancestorId = data.tasks.find((entry) => entry.id === ancestorId)?.parentId || null;
      }

      const sortedSiblings = (parentId, excludedId = null) => data.tasks
        .filter((entry) => (entry.parentId || null) === parentId && entry.id !== excludedId)
        .sort((a, b) => {
          const aOrder = Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : null;
          const bOrder = Number.isFinite(Number(b.sortOrder)) ? Number(b.sortOrder) : null;
          if (aOrder !== null && bOrder !== null && aOrder !== bOrder) return aOrder - bOrder;
          if (aOrder !== null && bOrder === null) return -1;
          if (aOrder === null && bOrder !== null) return 1;
          return String(a.title).localeCompare(String(b.title));
        });
      const stamp = nowIso();
      const reindex = (siblings) => siblings.forEach((entry, index) => {
        entry.sortOrder = index;
        entry.updatedAt = stamp;
      });

      task.parentId = nextParentId;
      const nextSiblings = sortedSiblings(nextParentId, task.id);
      let insertAt = nextSiblings.length;
      if (position !== 'inside') {
        const targetIndex = nextSiblings.findIndex((entry) => entry.id === target.id);
        insertAt = targetIndex + (position === 'after' ? 1 : 0);
      }
      nextSiblings.splice(Math.max(0, insertAt), 0, task);
      reindex(nextSiblings);
      if (oldParentId !== nextParentId) reindex(sortedSiblings(oldParentId, task.id));
    }

    if (type === 'deleteTaskCascade') {
      const rootId = mutation.id;
      const taskMap = new Map(data.tasks.map((entry) => [entry.id, entry]));
      if (!taskMap.has(rootId)) throw new Error(`Item not found: tasks/${rootId}`);
      const ids = new Set([rootId]);
      let changed = true;
      while (changed) {
        changed = false;
        data.tasks.forEach((entry) => {
          if (entry.parentId && ids.has(entry.parentId) && !ids.has(entry.id)) {
            ids.add(entry.id);
            changed = true;
          }
        });
      }

      const stamp = nowIso();
      data.weeklyTaskBindings = data.weeklyTaskBindings.filter((entry) => !ids.has(entry.taskId));
      data.dailyTaskBindings = data.dailyTaskBindings.filter((entry) => !ids.has(entry.taskId));
      data.scheduleBlocks = data.scheduleBlocks.map((entry) => {
        if (!ids.has(entry.taskId)) return entry;
        const task = taskMap.get(entry.taskId);
        return { ...entry, title: entry.title || task?.title || '', taskId: null, updatedAt: stamp };
      });
      data.timeEntries = data.timeEntries.map((entry) => {
        if (!ids.has(entry.taskId)) return entry;
        const task = taskMap.get(entry.taskId);
        return { ...entry, title: entry.title || task?.title || '', taskId: null, updatedAt: stamp };
      });
      data.insights = data.insights.map((entry) => ids.has(entry.taskId) ? { ...entry, taskId: null, updatedAt: stamp } : entry);
      data.tasks = data.tasks.filter((entry) => !ids.has(entry.id));
    }

    if (type === 'delete') {
      if (!Array.isArray(data[collection])) throw new Error(`Unknown collection: ${collection}`);

      if (collection === 'tasks') {
        const blockedByTask = [
          ...data.weeklyTaskBindings.filter((entry) => entry.taskId === itemId).map(() => 'weekly task bindings'),
          ...data.dailyTaskBindings.filter((entry) => entry.taskId === itemId).map(() => 'daily task bindings'),
          ...data.scheduleBlocks.filter((entry) => entry.taskId === itemId).map(() => 'schedule blocks'),
          ...data.timeEntries.filter((entry) => entry.taskId === itemId).map(() => 'time entries'),
          ...data.insights.filter((entry) => entry.taskId === itemId).map(() => 'insights'),
          ...data.tasks.filter((entry) => entry.parentId === itemId).map(() => 'child tasks'),
        ];
        if (blockedByTask.length) throw new Error('Cannot delete task: it is still referenced by plans, records, or child tasks.');
      }

      if (collection === 'eventCategories') {
        const blockedByCategory = [
          ...data.timeEntries.filter((entry) => entry.categoryId === itemId).map(() => 'time entries'),
          ...data.eventCategories.filter((entry) => entry.parentId === itemId).map(() => 'child categories'),
        ];
        if (blockedByCategory.length) throw new Error('Cannot delete category: it is still referenced by records or child categories.');
      }

      if (collection === 'okrCycles') {
        const blockedByCycle = [
          ...data.objectives.filter((entry) => entry.cycleId === itemId).map(() => 'objectives'),
        ];
        if (blockedByCycle.length) throw new Error('Cannot delete OKR cycle: delete or move its objectives first.');
      }

      if (collection === 'objectives') {
        const blockedByObjective = [
          ...data.keyResults.filter((entry) => entry.objectiveId === itemId).map(() => 'key results'),
        ];
        if (blockedByObjective.length) throw new Error('Cannot delete objective: delete its key results first.');
      }

      if (collection === 'timeEntries') {
        const blockedByTimeEntry = [
          ...data.insights.filter((entry) => entry.timeEntryId === itemId).map(() => 'insights'),
        ];
        if (blockedByTimeEntry.length) throw new Error('Cannot delete time record: insights still reference it.');
      }

      data[collection] = data[collection].filter((entry) => entry.id !== itemId && !(collection === 'dailyPlans' && entry.date === itemId));
    }

    if (type === 'setMeta') {
      data.meta = { ...(data.meta || {}), ...patch, updatedAt: nowIso() };
    }

    if (type === 'setTemplate') {
      data.templates = { ...(data.templates || {}), [key]: mutation.value };
    }

    if (type === 'setSettings') {
      data.settings = { ...(data.settings || {}), ...(patch || {}) };
    }

    if (!['upsert', 'patch', 'moveTask', 'deleteTaskCascade', 'delete', 'setMeta', 'setTemplate', 'setSettings'].includes(type)) {
      throw new Error(`Unknown mutation type: ${type}`);
    }

    return write(data);
  }

  return { getData, replace, mutate, dataPath };
}

function prefixFor(collection) {
  const map = {
    eventCategories: 'cat',
    tasks: 'task',
    okrCycles: 'okr',
    objectives: 'obj',
    keyResults: 'kr',
    weeklyPlans: 'week',
    weeklyTaskBindings: 'wt',
    dailyTaskBindings: 'dt',
    monthlyPlans: 'month',
    scheduleBlocks: 'sb',
    timeEntries: 'te',
    insights: 'ins',
    visionDocuments: 'vision',
  };
  return map[collection] || 'id';
}

module.exports = {
  createStore,
  createInitialData,
  startOfWeekIso,
};
