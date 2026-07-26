const path = require('node:path');
const fs = require('node:fs/promises');

function minutesBetween(start, end) {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  if ([sh, sm, eh, em].some(Number.isNaN)) return 0;
  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  return Math.max(0, endMinutes - startMinutes);
}

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function getCategoryPath(categories, categoryId) {
  const byId = new Map(categories.map((cat) => [cat.id, cat]));
  const parts = [];
  let current = byId.get(categoryId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    parts.unshift(current.name);
    seen.add(current.id);
    current = current.parentId ? byId.get(current.parentId) : null;
  }
  return parts.join(' / ');
}

function getTaskPath(tasks, taskId) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const parts = [];
  let current = byId.get(taskId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    parts.unshift(current.title);
    seen.add(current.id);
    current = current.parentId ? byId.get(current.parentId) : null;
  }
  return parts.join(' / ');
}

function isFocusCategory(categories, categoryId) {
  const byId = new Map(categories.map((cat) => [cat.id, cat]));
  let current = byId.get(categoryId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    if (typeof current.focus === 'boolean') return current.focus;
    seen.add(current.id);
    current = current.parentId ? byId.get(current.parentId) : null;
  }
  return false;
}

function toLocalDateIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function insightDate(insight) {
  if (insight.date) return insight.date;
  return toLocalDateIso(new Date(insight.timestamp));
}

function summarizeDay(data, date) {
  const timeEntries = data.timeEntries.filter((entry) => entry.date === date);
  const dailyTasks = data.dailyTaskBindings.filter((entry) => entry.date === date);
  const insights = data.insights.filter((entry) => insightDate(entry) === date);
  const focusMinutes = timeEntries.reduce((sum, entry) => {
    return sum + (isFocusCategory(data.eventCategories, entry.categoryId) ? minutesBetween(entry.start, entry.end) : 0);
  }, 0);
  return { date, timeEntries, dailyTasks, insights, focusMinutes };
}

function dateRange(startDate, days) {
  const result = [];
  const start = new Date(`${startDate}T00:00:00`);
  for (let index = 0; index < days; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    result.push(toLocalDateIso(date));
  }
  return result;
}

function makeTimeCsv(data) {
  const rows = [
    ['date', 'start', 'end', 'minutes', 'name', 'category', 'focus', 'task', 'note'],
    ...data.timeEntries.map((entry) => [
      entry.date,
      entry.start,
      entry.end,
      minutesBetween(entry.start, entry.end),
      entry.title || '',
      getCategoryPath(data.eventCategories, entry.categoryId),
      isFocusCategory(data.eventCategories, entry.categoryId) ? 'yes' : 'no',
      getTaskPath(data.tasks, entry.taskId),
      entry.note || '',
    ]),
  ];
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}

function makeTasksCsv(data) {
  const rows = [
    ['id', 'parent_id', 'path', 'title', 'status', 'estimated_minutes', 'priority', 'tags', 'note'],
    ...data.tasks.map((task) => [
      task.id,
      task.parentId || '',
      getTaskPath(data.tasks, task.id),
      task.title,
      task.status,
      task.estimatedMinutes || 0,
      task.priority || '',
      Array.isArray(task.tags) ? task.tags.join(', ') : task.tags || '',
      task.note || '',
    ]),
  ];
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}

function makeMarkdownBundle(data) {
  const activeDate = data.meta?.activeDate || new Date().toISOString().slice(0, 10);
  const activeWeekStart = data.meta?.activeWeekStart || activeDate;
  const days = dateRange(activeWeekStart, 7);
  const taskById = new Map(data.tasks.map((task) => [task.id, task]));
  const findDocumentContent = (scope, key, type) => (data.documents || [])
    .find((doc) => doc.scope === scope && doc.key === key && doc.type === type)?.content || '';
  const weekPlanContent = findDocumentContent('week', activeWeekStart, 'plan');
  const weekReviewContent = findDocumentContent('week', activeWeekStart, 'review');
  const weeklyBindings = data.weeklyTaskBindings.filter((binding) => binding.weekStart === activeWeekStart);
  const lines = [];

  lines.push(`# IterSelf Export`);
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Active date: ${activeDate}`);
  lines.push(`Active week: ${activeWeekStart}`);
  lines.push('');

  lines.push('## Current week summary');
  lines.push('');
  if (weekPlanContent || weekReviewContent) {
    lines.push('### Weekly plan document');
    lines.push('');
    lines.push(weekPlanContent);
    lines.push('');
    lines.push('### Weekly review document');
    lines.push('');
    lines.push(weekReviewContent);
    lines.push('');
  }

  lines.push('### Weekly task bindings');
  lines.push('');
  if (weeklyBindings.length === 0) lines.push('- None');
  for (const binding of weeklyBindings) {
    const task = taskById.get(binding.taskId);
    lines.push(`- ${task ? getTaskPath(data.tasks, task.id) : '(missing task)'}`);
  }
  lines.push('');

  lines.push('## Daily records');
  lines.push('');
  for (const day of days) {
    const summary = summarizeDay(data, day);
    lines.push(`### ${day}`);
    lines.push('');
    lines.push(`Focus time: ${summary.focusMinutes} min`);
    lines.push('');
    lines.push('#### Daily plan document');
    lines.push('');
    lines.push(findDocumentContent('day', day, 'plan'));
    lines.push('');
    lines.push('#### Daily review document');
    lines.push('');
    lines.push(findDocumentContent('day', day, 'review'));
    lines.push('');
    lines.push('#### Tasks');
    lines.push('');
    if (summary.dailyTasks.length === 0) lines.push('- None');
    for (const binding of summary.dailyTasks) {
      lines.push(`- ${getTaskPath(data.tasks, binding.taskId)}`);
    }
    lines.push('');
    lines.push('#### Time entries');
    lines.push('');
    if (summary.timeEntries.length === 0) lines.push('- None');
    for (const entry of summary.timeEntries) {
      const name = entry.title || getCategoryPath(data.eventCategories, entry.categoryId) || getTaskPath(data.tasks, entry.taskId) || 'Time record';
      lines.push(`- ${entry.start}-${entry.end} (${minutesBetween(entry.start, entry.end)} min) ${name}${entry.taskId ? ` → ${getTaskPath(data.tasks, entry.taskId)}` : ''}${entry.note ? ` — ${entry.note}` : ''}`);
    }
    lines.push('');
    lines.push('#### Insights');
    lines.push('');
    if (summary.insights.length === 0) lines.push('- None');
    for (const insight of summary.insights) {
      const boundTask = insight.taskId ? getTaskPath(data.tasks, insight.taskId) : '';
      const boundEntry = insight.timeEntryId ? data.timeEntries.find((entry) => entry.id === insight.timeEntryId) : null;
      const time = new Date(insight.timestamp);
      const hhmm = insight.time || (Number.isNaN(time.getTime()) ? '' : `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`);
      lines.push(`- ${hhmm ? `${hhmm} ` : ''}${insight.content}${boundTask ? ` → ${boundTask}` : ''}${boundEntry ? ` → ${boundEntry.start}-${boundEntry.end} ${boundEntry.title || getTaskPath(data.tasks, boundEntry.taskId) || ''}` : ''}${insight.note ? ` — ${insight.note}` : ''}`);
    }
    lines.push('');
  }

  lines.push('## OKR objectives');
  lines.push('');
  for (const objective of data.objectives) {
    lines.push(`### O: ${objective.title} (${objective.startDate} to ${objective.endDate})`);
    const krs = data.keyResults.filter((kr) => kr.objectiveId === objective.id);
    for (const kr of krs) {
      lines.push(`- KR: ${kr.title}${kr.note ? ` — ${kr.note}` : ''}`);
    }
  }
  lines.push('');

  return lines.join('\n');
}

async function createExportBundle(data, targetDir, options = {}) {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  const outDir = path.join(targetDir, `iterself-export-${stamp}`);
  await fs.mkdir(outDir, { recursive: true });

  const files = [];
  const jsonPath = path.join(outDir, 'data.json');
  await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  files.push(jsonPath);

  const mdPath = path.join(outDir, 'review-bundle.md');
  await fs.writeFile(mdPath, makeMarkdownBundle(data), 'utf8');
  files.push(mdPath);

  const timeCsvPath = path.join(outDir, 'time-records.csv');
  await fs.writeFile(timeCsvPath, makeTimeCsv(data), 'utf8');
  files.push(timeCsvPath);

  const taskCsvPath = path.join(outDir, 'tasks.csv');
  await fs.writeFile(taskCsvPath, makeTasksCsv(data), 'utf8');
  files.push(taskCsvPath);

  return { outDir, files, options };
}

module.exports = {
  createExportBundle,
  minutesBetween,
  isFocusCategory,
  getCategoryPath,
  getTaskPath,
};
