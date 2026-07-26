const NAV = [
  { id: 'dashboard', label: 'Data overview' },
  { id: 'schedule', label: 'Short-term schedule' },
  { id: 'month', label: 'Medium-term monthly plan' },
  { id: 'tasks', label: 'Task' },
  { id: 'okr', label: 'OKR' },
  { id: 'vision', label: 'Long-term vision' },
  { id: 'logs', label: 'Logs' },
  { id: 'settings', label: 'Settings' },
];

const NAV_ICONS = {
  dashboard: '<path d="M4 5.5h7v6H4z"/><path d="M13 5.5h7v4h-7z"/><path d="M13 11.5h7v7h-7z"/><path d="M4 13.5h7v5H4z"/>',
  schedule: '<path d="M7 3.5v3"/><path d="M17 3.5v3"/><path d="M4.5 8.5h15"/><rect x="4.5" y="5.5" width="15" height="15" rx="2.5"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M8 16h.01"/><path d="M12 16h.01"/>',
  month: '<path d="M5 5.5h14"/><path d="M7 3.5v4"/><path d="M17 3.5v4"/><rect x="5" y="5.5" width="14" height="15" rx="2"/><path d="M8 11.5h8"/><path d="M8 15.5h5"/>',
  okr: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 12l6-6"/>',
  tasks: '<path d="M8 6h12"/><path d="M8 12h12"/><path d="M8 18h12"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/>',
  vision: '<path d="M4 12s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"/><circle cx="12" cy="12" r="2.5"/>',
  logs: '<path d="M6 4.5h12"/><path d="M6 9h12"/><path d="M6 13.5h8"/><path d="M6 18h10"/>',
  settings: '<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/><path d="M19 12a7.5 7.5 0 0 0-.1-1.2l2-1.5-2-3.4-2.4 1a8 8 0 0 0-2-1.1L14.2 3h-4.4l-.4 2.8a8 8 0 0 0-2 1.1l-2.4-1-2 3.4 2 1.5A7.5 7.5 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.4-1a8 8 0 0 0 2 1.1l.4 2.8h4.4l.4-2.8a8 8 0 0 0 2-1.1l2.4 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/>',
};

const ZH = {
  'Data overview': '数据总览', 'Short-term schedule': '短期日程',
  'Medium-term monthly plan': '中期月规划', 'Long-term vision': '长期愿景', 'Logs': '日志',
  'Dashboard': '总览', 'Today + week': '今天与本周', 'Today': '今日',
  'Plan / record / review': '计划 / 记录 / 复盘', 'Week': '本周', 'Commitments': '周任务',
  'Schedule': '日程', 'Week + days': '周与日',
  'Month': '本月', 'OKR + docs': '目标与文档', 'OKR': '目标',
  'Task Pool': '任务池', 'Nested actions': '任务库存',
  'Vision': '愿景', 'Long-term docs': '长期文档', 'Settings': '设置', 'Preferences + data': '偏好与数据',
  'Local-first desktop app': '本地优先桌面应用', 'Your data stays on this device': '数据只保存在这台设备',
  'Plan · Record · Review': '规划 · 记录 · 复盘',
  'Today focus': '今日专注', 'Week focus': '本周专注', 'Today records': '今日记录', 'Insights': '心得',
  'Focus categories only': '仅统计专注分类', 'Actual time entries': '实际时间记录', 'Captured today': '今天记录的心得',
  'Today at a glance': '今日概览', 'Current week': '本周概览', 'Related OKR': '相关 OKR',
  'Daily tasks': '日任务', 'Schedule blocks': '日计划', 'Time records': '时间记录',
  'Add schedule block': '新增日计划', 'Add time record': '新增时间记录', 'Add insight': '新增心得',
  'Daily plan document': '计划文档', 'Daily review document': '复盘文档',
  'Weekly task commitments': '周任务', 'Week focus table': '本周记录',
  'Weekly planning document': '周规划', 'Weekly review document': '周复盘',
  'Monthly planning document': '月规划', 'Monthly review document': '月复盘',
  'Monthly related OKR': '本月相关 OKR', 'OKR library': 'OKR 库',
  'Task pool': '任务池', 'Nested tasks': '任务结构', 'Task overview': '任务总览', 'Task editor': '任务编辑',
  'Event categories': '事件分类', 'Category tree': '分类结构',
  'Vision documents': '愿景文档', 'Editor': '编辑器',
  'Add daily task': '添加日任务', 'Add block': '添加日计划', 'Add time record': '添加时间记录',
  'Capture insight': '记录心得', 'Add weekly commitment': '添加周任务', 'Add objective': '添加目标',
  'Add KR': '添加 KR', 'Add task': '添加任务', 'Add category': '添加分类', 'Add vision doc': '添加愿景文档',
  'Edit objective': '编辑目标',
  'Add key result': '新增 Key Result',
  'Key result detail': 'Key Result 详情',
  'Save plan': '保存计划', 'Save review': '保存复盘', 'Save weekly plan': '保存周规划',
  'Save weekly review': '保存周复盘', 'Save month plan': '保存月规划', 'Save month review': '保存月复盘',
  'Save': '保存', 'Save value': '保存数值', 'Save vision': '保存愿景', 'Delete': '删除', 'Edit': '编辑',
  'Start timer now': '现在开始计时', 'Cancel timer': '取消计时', 'Choose folder': '选择文件夹',
  'Export bundle': '导出数据包', 'Create backup': '创建备份', 'Data management': '数据管理',
  'Appearance and locale': '显示与地区', 'Language': '语言', 'Timezone': '时区', 'Theme': '主题',
  'Follow system': '跟随系统', 'Light': '浅色', 'Dark': '深色', 'Chinese': '中文', 'English': 'English',
  'System timezone': '跟随系统时区', 'Save settings': '保存设置', 'Export data': '导出数据',
  'Export folder': '导出目录', 'No folder selected': '尚未选择目录', 'Backup location': '备份位置',
  'No backup created in this session': '本次启动尚未创建备份',
  'Settings are saved locally and apply immediately.': '设置保存在本机，保存后立即生效。',
  'Export creates Markdown, JSON, and CSV files for analysis or migration.': '导出会生成 Markdown、JSON 和 CSV，便于分析或迁移。',
  'Task from pool': '任务池任务', 'Est. minutes': '预计分钟', 'Priority': '优先级',
  'Status': '状态', 'Start': '开始', 'End': '结束', 'Daily task': '日任务', 'Title': '名称', 'Date': '日期',
  'Duration': '持续时间', 'Tags': '标签', 'Bound task': '绑定任务', 'Bound time record': '绑定任务时间记录',
  'Event category': '事件分类', 'Task': '任务', 'Name': '名称', 'Note': '备注', 'Quick insight': '心得内容',
  'Time': '时间', 'Now': '现在', 'Hour': '时', 'Minute': '分',
  'Parent': '上级', 'Type': '类型', 'Est. total minutes': '预计总分钟',
  'Counts as focus?': '计入专注时间？', 'Color': '颜色', 'Content': '内容', 'Objective': '目标',
  'Description': '说明', 'Target': '目标值', 'Current': '当前值', 'Unit': '单位',
  'Yes': '是', 'No': '否', 'None': '无', 'Todo': '待办', 'Doing': '进行中', 'Done': '完成', 'Discarded': '丢弃',
  'Cancelled': '取消', 'Deferred': '推迟', 'Project': '项目', 'Routine': '例行', 'Habit': '习惯',
  'Important + urgent': '重要且紧急', 'Important + not urgent': '重要不紧急',
  'Not important + urgent': '不重要但紧急', 'Not important + not urgent': '不重要不紧急',
  'DAY': '日期', 'FOCUS': '专注', 'TASKS': '任务', 'RECORDS': '记录', 'TOTAL': '总计',
  'No daily tasks. Bind one from the task pool.': '暂无日任务，请从任务池添加。',
  'No schedule blocks yet. Keep this lightweight.': '暂无日计划。', 'No objective records yet.': '暂无时间记录。',
  'No tasks yet.': '暂无任务。', 'No task selected.': '未选择任务。', 'No categories yet.': '暂无分类。', 'No vision documents yet.': '暂无愿景文档。',
  'Select a document to edit.': '选择一篇文档进行编辑。', 'No key results.': '暂无 KR。',
  'Plan, objective records, and review live in one daily cycle.': '计划、客观记录和复盘都放在同一个日周期中。',
  'No time entries yet. Add your first objective record in Today.': '暂无时间记录，请在“今日”中添加。',
  'Objective effort time': '客观投入时间', 'Total recorded': '总记录时间', 'All categories': '全部分类',
  'Tasks done': '已完成任务', 'Daily commitments': '今日任务', 'Review context': '复盘素材',
  'Focus category records': '专注分类记录', 'All recorded': '全部记录', 'Daily bindings': '日任务',
  'Weekly tasks': '周任务', 'Commitments from task pool': '从任务池选择',
  'Set weekly tasks': '设置周任务', 'Set daily tasks': '设置各天日任务',
  'Capture thoughts, problems, tiny observations. They appear here for review.': '记录想法、问题和观察，复盘时会在这里看到。',
  'Choose tasks from the task pool for this week.': '从任务池中选择本周要做的任务。',
  'Objectives coexist independently. Each objective contains its own key results.': '多个目标可以并存，每个目标维护自己的 KR。',
  'No objectives yet.': '暂无目标。', 'No related objectives.': '本月没有相关目标。',
  'Inventory is not commitment. Weekly and daily plans bind from this pool.': '任务池只是库存，绑定为周任务或日任务后才算承诺。',
  'Select one item on the left, then edit the fields here.': '在左侧选择一项，然后在这里编辑字段。',
  'New root task': '新建根任务',
  'Edit task': '编辑任务', 'Drag tasks to reorder or change hierarchy.': '拖拽任务可调整顺序或上下级。',
  'Mark complete': '标记完成', 'Mark doing': '恢复进行中',
  'Add task': '添加任务', 'Tags separated by commas': '多个标签用逗号分隔',
  'Categories define what time means. Focus time is calculated from this tree.': '事件分类决定时间的含义，专注时间按这里的规则统计。',
  'Long-term meaning stays free. No forced metrics here.': '长期方向保持自由，不强制设置指标。',
  'active': '进行中', 'paused': '暂停', 'cancelled': '已取消', 'discarded': '丢弃', 'todo': '待办', 'doing': '进行中',
  'done': '完成', 'deferred': '推迟', 'project': '项目', 'task': '任务', 'habit': '习惯', 'routine': '例行',
  'focus': '专注', 'non-focus': '非专注', 'Mark focus': '设为专注', 'Mark non-focus': '设为非专注',
  'Active': '进行中', 'Paused': '暂停', 'Number': '数值', 'Count': '计数', 'Percent': '百分比',
  'Done / not done': '完成 / 未完成', 'Saved': '已保存', 'Deleted': '已删除',
  'Daily document saved': '日文档已保存', 'Weekly document saved': '周文档已保存',
  'Monthly document saved': '月文档已保存',
  'Focus rule updated': '专注规则已更新', 'Vision saved': '愿景已保存',
  'Timer cancelled': '计时已取消', 'Action failed': '操作失败',
  'Optional free title': '可选名称', 'What objectively happened?': '客观记录发生了什么',
  'Optional note': '可选备注', 'Optional': '可选',
  'Measurable or checkable result': '可衡量或可核对的结果', 'hours, times, pages…': '小时、次数、页数……',
  'Task, project, routine…': '任务、项目、例行事项……', 'Work / Deep Work': '工作 / 深度工作',
  'Vision / mission / direction': '愿景 / 使命 / 方向',
  'Application information': '应用信息', 'Version': '版本',
  'Collapse sidebar': '收起侧栏', 'Expand sidebar': '展开侧栏',
};

const PRIORITIES = [
  ['none', 'None'],
  ['important_urgent', 'Important + urgent'],
  ['important_not_urgent', 'Important + not urgent'],
  ['not_important_urgent', 'Not important + urgent'],
  ['not_important_not_urgent', 'Not important + not urgent'],
];

const TASK_STATUSES = [
  ['doing', 'Doing'],
  ['done', 'Done'],
  ['discarded', 'Discarded'],
];

let state = {
  data: null,
  page: 'dashboard',
  exportDir: null,
  timer: null,
  backupPath: null,
  appVersion: '',
  selectedTaskId: null,
  newTaskParentId: null,
  selectedObjectiveId: null,
  selectedKrObjectiveId: null,
  selectedKrId: null,
  selectedVisionId: null,
  confirmDeleteTaskId: null,
  selectedDailyDocDate: null,
  selectedDailyDocType: null,
  selectedScheduleBlockId: null,
  selectedTimeEntryId: null,
  selectedCycleDocScope: null,
  selectedCycleDocKey: null,
  selectedCycleDocType: null,
  collapsedTaskIds: new Set(),
  taskEditorMode: 'edit',
  scheduleScope: 'week',
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
  markdownWorkspace: null,
  markdownSidebarCollapsed: true,
  sidebarPanel: localStorage.getItem('sidebarPanel') === 'timeline' ? 'timeline' : 'md',
  timelineView: null,
  modal: null,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function toLocalDateIso(date) {
  const timezone = state.data?.settings?.timezone;
  if (timezone && timezone !== 'system') {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(date);
    const value = (type) => parts.find((part) => part.type === type)?.value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function todayIso() {
  return toLocalDateIso(new Date());
}

function calendarDateIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function nowTime() {
  const timezone = state.data?.settings?.timezone;
  if (timezone && timezone !== 'system') {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).format(new Date());
  }
  return new Date().toTimeString().slice(0, 5);
}

function timeInput(name, value, required = true) {
  const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'));
  const column = (part, values, label) => `
    <div class="time-col-wrap">
      <div class="time-col-label">${t(label)}</div>
      <div class="time-col" data-time-part="${part}">
        ${values.map((item) => `<button type="button" class="time-col-item" data-time-value="${item}">${item}</button>`).join('')}
      </div>
    </div>
  `;
  return `
    <div class="time-input-wrap" data-time-picker>
      <input name="${name}" type="text" inputmode="numeric" autocomplete="off" class="time-input" data-time-input value="${escapeHtml(value)}" placeholder="HH:MM" pattern="^([01]?\\d|2[0-3]):[0-5]\\d$" ${required ? 'required' : ''} />
      <div class="time-picker" aria-label="Time picker">
        <div class="time-quick">
          <button type="button" class="time-quick-chip" data-time-set="now">${t('Now')}</button>
        </div>
        <div class="time-columns">
          ${column('hour', hours, 'Hour')}
          ${column('minute', minutes, 'Minute')}
        </div>
      </div>
    </div>
  `;
}

function t(text) {
  return state.data?.settings?.language === 'en' ? text : (ZH[text] || text);
}

function navIcon(id) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${NAV_ICONS[id] || NAV_ICONS.dashboard}</svg>`;
}

function displayDateTime(value) {
  const timezone = state.data?.settings?.timezone;
  const options = timezone && timezone !== 'system' ? { timeZone: timezone } : {};
  return new Date(value).toLocaleString(state.data?.settings?.language === 'en' ? 'en-US' : 'zh-CN', options);
}

function applySettings() {
  const settings = state.data.settings || {};
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = settings.theme === 'system' ? (systemDark ? 'dark' : 'light') : (settings.theme || 'light');
  document.documentElement.lang = settings.language || 'zh-CN';
}

function translateRenderedUi() {
  if (state.data.settings?.language === 'en') return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const value = node.nodeValue;
    const trimmed = value.trim();
    if (ZH[trimmed]) node.nodeValue = value.replace(trimmed, ZH[trimmed]);
  }
  document.querySelectorAll('[placeholder]').forEach((element) => {
    if (ZH[element.placeholder]) element.placeholder = ZH[element.placeholder];
  });
}

function timeToMinutes(time) {
  if (!time) return null;
  const [hours, minutes] = time.split(':').map(Number);
  if ([hours, minutes].some(Number.isNaN)) return null;
  return hours * 60 + minutes;
}

function normalizeTimeValue(value) {
  const text = String(value || '').trim();
  let hours;
  let minutes;
  const withColon = text.match(/^(\d{1,2}):(\d{1,2})$/);
  if (withColon) {
    hours = Number(withColon[1]);
    minutes = Number(withColon[2]);
  } else if (/^\d{1,4}$/.test(text)) {
    // Compact typing: 9 → 09:00, 930 → 09:30, 2130 → 21:30
    if (text.length <= 2) {
      hours = Number(text);
      minutes = 0;
    } else if (text.length === 3) {
      hours = Number(text.slice(0, 1));
      minutes = Number(text.slice(1));
    } else {
      hours = Number(text.slice(0, 2));
      minutes = Number(text.slice(2));
    }
  } else {
    return null;
  }
  if (hours > 23 || minutes > 59) return null;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function addMinutesToTime(value, delta) {
  const normalized = normalizeTimeValue(value) || nowTime();
  const current = timeToMinutes(normalized);
  const next = (current + delta + 24 * 60) % (24 * 60);
  return `${String(Math.floor(next / 60)).padStart(2, '0')}:${String(next % 60).padStart(2, '0')}`;
}

function timeParts(value) {
  const normalized = normalizeTimeValue(value) || nowTime();
  const [hour, minute] = normalized.split(':');
  return { hour, minute };
}

function setTimeInputPart(input, part, value) {
  const parts = timeParts(input.value);
  parts[part] = value;
  input.value = `${parts.hour}:${parts.minute}`;
}

// Programmatic scrolls set a suppress flag so the scrollend commit handler
// ignores them — only user-initiated scrolls may write the input back.
function scrollColumnToValue(column, value) {
  const item = column.querySelector(`[data-time-value="${value}"]`);
  if (!item) return;
  const top = item.offsetTop - (column.clientHeight - item.offsetHeight) / 2;
  if (Math.abs(column.scrollTop - top) < 1) return;
  column.suppressCommit = true;
  column.scrollTop = top;
}

function centeredColumnValue(column) {
  const center = column.scrollTop + column.clientHeight / 2;
  let best = null;
  let bestDistance = Infinity;
  column.querySelectorAll('.time-col-item').forEach((item) => {
    const distance = Math.abs(center - (item.offsetTop + item.offsetHeight / 2));
    if (distance < bestDistance) {
      best = item.dataset.timeValue;
      bestDistance = distance;
    }
  });
  return best;
}

// iOS-style depth: items dim and shrink with distance from the center band.
function updateWheelFalloff(column) {
  const center = column.scrollTop + column.clientHeight / 2;
  let best = null;
  let bestDistance = Infinity;
  column.querySelectorAll('.time-col-item').forEach((item) => {
    const distance = Math.abs(center - (item.offsetTop + item.offsetHeight / 2));
    const steps = distance / item.offsetHeight;
    item.style.opacity = String(Math.max(0.16, 1 - steps * 0.26));
    item.style.transform = `scale(${Math.max(0.8, 1 - steps * 0.055)})`;
    if (distance < bestDistance) {
      best = item;
      bestDistance = distance;
    }
  });
  column.querySelectorAll('.time-col-item.centered').forEach((item) => {
    if (item !== best) item.classList.remove('centered');
  });
  if (best) best.classList.add('centered');
}

function syncTimePicker(input) {
  const wrap = input.closest('[data-time-picker]');
  if (!wrap) return;
  const parts = timeParts(input.value);
  wrap.querySelectorAll('[data-time-part]').forEach((column) => {
    const value = column.dataset.timePart === 'hour' ? parts.hour : parts.minute;
    scrollColumnToValue(column, value);
    updateWheelFalloff(column);
  });
}

function normalizeTimeFields(values, fields) {
  for (const field of fields) {
    const normalized = normalizeTimeValue(values[field]);
    if (!normalized) {
      showToast(state.data.settings?.language === 'en' ? 'Use time like 09:30.' : '时间请填写为 09:30。');
      return false;
    }
    values[field] = normalized;
  }
  return true;
}

function minutesBetween(start, end) {
  const s = timeToMinutes(start);
  let e = timeToMinutes(end);
  if (s === null || e === null) return 0;
  if (e < s) e += 24 * 60;
  return Math.max(0, e - s);
}

function formatMinutes(minutes) {
  const rounded = Math.round(minutes || 0);
  const hours = Math.floor(rounded / 60);
  const mins = rounded % 60;
  if (hours <= 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatTaskDuration(minutes) {
  const rounded = Math.max(0, Math.round(Number(minutes) || 0));
  return `${Math.floor(rounded / 60)}h ${rounded % 60}m`;
}

function parseTaskDuration(value) {
  const text = String(value || '').trim().toLowerCase();
  if (/^\d+$/.test(text)) return Number(text);
  const match = text.match(/^(?:(\d+)\s*h)?\s*(?:(\d+)\s*m)?$/);
  if (!match || (!match[1] && !match[2])) return null;
  return Number(match[1] || 0) * 60 + Number(match[2] || 0);
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return calendarDateIso(date);
}

function startOfWeekIso(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return calendarDateIso(date);
}

function weekDates(weekStart) {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

function weekNumber(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / 86400000);
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}

function weekTitle(weekStart) {
  const end = addDays(weekStart, 6);
  if (state.data?.settings?.language === 'en') {
    return `${weekStart} – ${end} · W${weekNumber(weekStart)}`;
  }
  const [startYear, startMonth, startDay] = weekStart.split('-').map(Number);
  const [endYear, endMonth, endDay] = end.split('-').map(Number);
  const endLabel = startYear !== endYear
    ? `${endYear}年${endMonth}月${endDay}日`
    : startMonth !== endMonth
      ? `${endMonth}月${endDay}日`
      : `${endDay}日`;
  return `${startYear}年${startMonth}月${startDay}日 – ${endLabel} · 第${weekNumber(weekStart)}周`;
}

function addMonths(monthKey, offset) {
  const [year, month] = monthKey.split('-').map(Number);
  return calendarDateIso(new Date(year, month - 1 + offset, 1)).slice(0, 7);
}

function monthDate(monthKey) {
  return `${monthKey}-01`;
}

function monthHalfStart(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  const startMonth = month <= 6 ? 1 : 7;
  return `${year}-${String(startMonth).padStart(2, '0')}`;
}

function monthLabel(monthKey) {
  const date = new Date(`${monthDate(monthKey)}T00:00:00`);
  return state.data?.settings?.language === 'en'
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
}

function shortDayLabel(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return state.data?.settings?.language === 'en'
    ? date.toLocaleDateString('en-US', { weekday: 'short' })
    : date.toLocaleDateString('zh-CN', { weekday: 'short' });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function optionList(items, selected, empty = 'None') {
  const opts = empty == null ? '' : `<option value="">${escapeHtml(t(empty))}</option>`;
  return opts + items.map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(t(label))}</option>`).join('');
}

function collection(name) {
  return state.data?.[name] || [];
}

function byId(name) {
  return new Map(collection(name).map((item) => [item.id, item]));
}

function taskDisplayTitle(task) {
  return task?.title?.trim() || '未命名';
}

function docDisplayTitle(doc) {
  return doc?.title?.trim() || '未命名';
}

function getTaskPath(taskId) {
  const map = byId('tasks');
  const parts = [];
  let current = map.get(taskId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    parts.unshift(taskDisplayTitle(current));
    seen.add(current.id);
    current = current.parentId ? map.get(current.parentId) : null;
  }
  return parts.join(' / ');
}

function taskDescendantIds(taskId) {
  const ids = new Set([taskId]);
  let changed = true;
  while (changed) {
    changed = false;
    collection('tasks').forEach((task) => {
      if (task.parentId && ids.has(task.parentId) && !ids.has(task.id)) {
        ids.add(task.id);
        changed = true;
      }
    });
  }
  return ids;
}

function taskDeleteImpact(taskId) {
  const ids = taskDescendantIds(taskId);
  const includesTask = (entry) => ids.has(entry.taskId);
  const impact = {
    childTasks: Math.max(0, ids.size - 1),
    weeklyTaskBindings: collection('weeklyTaskBindings').filter(includesTask).length,
    dailyTaskBindings: collection('dailyTaskBindings').filter(includesTask).length,
    scheduleBlocks: collection('scheduleBlocks').filter(includesTask).length,
    timeEntries: collection('timeEntries').filter(includesTask).length,
    insights: collection('insights').filter(includesTask).length,
  };
  impact.total = Object.values(impact).reduce((sum, count) => sum + count, 0);
  return impact;
}

function getCategoryPath(categoryId) {
  const map = byId('eventCategories');
  const parts = [];
  let current = map.get(categoryId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    parts.unshift(current.name);
    seen.add(current.id);
    current = current.parentId ? map.get(current.parentId) : null;
  }
  return parts.join(' / ');
}

function isFocusCategory(categoryId) {
  const map = byId('eventCategories');
  let current = map.get(categoryId);
  const seen = new Set();
  while (current && !seen.has(current.id)) {
    if (typeof current.focus === 'boolean') return current.focus;
    seen.add(current.id);
    current = current.parentId ? map.get(current.parentId) : null;
  }
  return false;
}

function treeItems(items, labelKey = 'title') {
  const children = new Map();
  for (const item of items) {
    const key = item.parentId || '__root__';
    if (!children.has(key)) children.set(key, []);
    children.get(key).push(item);
  }
  for (const list of children.values()) list.sort((a, b) => {
    const aOrder = Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : null;
    const bOrder = Number.isFinite(Number(b.sortOrder)) ? Number(b.sortOrder) : null;
    if (aOrder !== null && bOrder !== null && aOrder !== bOrder) return aOrder - bOrder;
    if (aOrder !== null && bOrder === null) return -1;
    if (aOrder === null && bOrder !== null) return 1;
    return String(a[labelKey]).localeCompare(String(b[labelKey]));
  });
  const result = [];
  const visit = (parentId, depth) => {
    for (const item of children.get(parentId || '__root__') || []) {
      result.push({ item, depth });
      visit(item.id, depth + 1);
    }
  };
  visit(null, 0);
  return result;
}

function visibleTaskTreeItems(items) {
  const children = new Map();
  for (const item of items) {
    const key = item.parentId || '__root__';
    if (!children.has(key)) children.set(key, []);
    children.get(key).push(item);
  }
  for (const list of children.values()) list.sort((a, b) => {
    const aOrder = Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : null;
    const bOrder = Number.isFinite(Number(b.sortOrder)) ? Number(b.sortOrder) : null;
    if (aOrder !== null && bOrder !== null && aOrder !== bOrder) return aOrder - bOrder;
    if (aOrder !== null && bOrder === null) return -1;
    if (aOrder === null && bOrder !== null) return 1;
    return String(a.title).localeCompare(String(b.title));
  });
  const result = [];
  const visit = (parentId, depth) => {
    for (const item of children.get(parentId || '__root__') || []) {
      const hasChildren = Boolean(children.get(item.id)?.length);
      result.push({ item, depth, hasChildren });
      if (hasChildren && !state.collapsedTaskIds.has(item.id)) visit(item.id, depth + 1);
    }
  };
  visit(null, 0);
  return result;
}

function taskOptions() {
  return treeItems(collection('tasks')).map(({ item, depth }) => [item.id, `${'— '.repeat(depth)}${item.title}`]);
}

function taskTagsValue(task) {
  if (Array.isArray(task?.tags)) return task.tags.join(', ');
  return task?.tags || '';
}

function normalizeTaskStatus(status) {
  if (status === 'done') return 'done';
  if (status === 'discarded' || status === 'cancelled') return 'discarded';
  return 'doing';
}

function taskStatusBadgeClass(status) {
  const normalized = normalizeTaskStatus(status);
  if (normalized === 'done') return 'ok';
  if (normalized === 'discarded') return 'danger';
  return '';
}

function categoryOptions() {
  return treeItems(collection('eventCategories'), 'name').map(({ item, depth }) => [item.id, `${'— '.repeat(depth)}${item.name}`]);
}

function krOptions() {
  const objectiveMap = byId('objectives');
  return collection('keyResults').map((kr) => {
    const objective = objectiveMap.get(kr.objectiveId);
    return [kr.id, `${objective ? `${objective.title} → ` : ''}${kr.title}`];
  });
}

function weeklyBindingOptions() {
  const weekStart = activeWeekStart();
  return collection('weeklyTaskBindings')
    .filter((binding) => binding.weekStart === weekStart)
    .map((binding) => [binding.id, getTaskPath(binding.taskId)]);
}

function dailyTaskOptions(date = activeDate()) {
  return collection('dailyTaskBindings')
    .filter((binding) => binding.date === date)
    .map((binding) => [binding.id, getTaskPath(binding.taskId)]);
}

function timeEntryOptions(date = activeDate()) {
  return collection('timeEntries')
    .filter((entry) => entry.date === date)
    .sort((a, b) => `${a.start}`.localeCompare(`${b.start}`))
    .map((entry) => [entry.id, `${entry.start}-${entry.end} ${entry.title || getTaskPath(entry.taskId) || entry.note || ''}`.trim()]);
}

function activeDate() {
  return state.data.meta?.activeDate || todayIso();
}

function activeWeekStart() {
  return state.data.meta?.activeWeekStart || startOfWeekIso(activeDate());
}

function monthBounds(dateString = activeDate()) {
  const [year, month] = dateString.slice(0, 7).split('-').map(Number);
  const endDay = new Date(year, month, 0).getDate();
  const monthKey = `${year}-${String(month).padStart(2, '0')}`;
  return { monthKey, start: `${monthKey}-01`, end: `${monthKey}-${String(endDay).padStart(2, '0')}` };
}

function objectivesForRange(start, end) {
  return collection('objectives').filter((objective) => objective.startDate <= end && objective.endDate >= start);
}

async function mutate(mutation, message = 'Saved') {
  state.data = await window.iterself.mutate(mutation);
  showToast(message);
  render();
}

async function tryAction(fn) {
  try {
    await fn();
  } catch (error) {
    console.error(error);
    showToast(error?.message || 'Action failed');
  }
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = t(message);
  toast.classList.add('visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

function insightDate(insight) {
  if (insight.date) return insight.date;
  return toLocalDateIso(new Date(insight.timestamp));
}

function summarizeDate(date) {
  const entries = collection('timeEntries').filter((entry) => entry.date === date);
  const focusMinutes = entries.reduce((sum, entry) => sum + (isFocusCategory(entry.categoryId) ? minutesBetween(entry.start, entry.end) : 0), 0);
  const totalMinutes = entries.reduce((sum, entry) => sum + minutesBetween(entry.start, entry.end), 0);
  const dailyTasks = collection('dailyTaskBindings').filter((binding) => binding.date === date);
  const taskMap = byId('tasks');
  const completed = dailyTasks.filter((binding) => taskMap.get(binding.taskId)?.status === 'done').length;
  const insights = collection('insights').filter((insight) => insightDate(insight) === date);
  return { entries, focusMinutes, totalMinutes, dailyTasks, completed, insights };
}

function findDocument(scope, key, type) {
  return collection('documents').find((doc) => doc.scope === scope && doc.key === key && doc.type === type);
}

function docTemplate(scope, type) {
  const templates = state.data.templates || {};
  if (scope === 'day') {
    return (type === 'review' ? templates.dayReview : templates.dayPlan)
      || (type === 'review' ? '# Daily Review\n\n' : '# Daily Plan\n\n');
  }
  if (scope === 'month') {
    return (type === 'review' ? templates.monthReview : templates.monthPlan)
      || (type === 'review' ? '# Monthly Review\n\n' : '# Monthly OKR Plan\n\n');
  }
  return (type === 'review' ? templates.weekReview : templates.weekPlan)
    || (type === 'review' ? '# Weekly Review\n\n' : '# Weekly Plan\n\n');
}

async function saveDocument(scope, key, type, content, message) {
  const existing = findDocument(scope, key, type);
  await mutate({
    type: 'upsert',
    collection: 'documents',
    item: { ...(existing || { title: '' }), scope, key, type, content },
  }, message);
}

function dailyDocState(date) {
  return {
    hasPlan: Boolean(findDocument('day', date, 'plan')),
    hasReview: Boolean(findDocument('day', date, 'review')),
  };
}

function dailyDocTemplate(type) {
  return docTemplate('day', type);
}

function dailyDocValue(date, type, fallbackToTemplate = false) {
  const value = findDocument('day', date, type)?.content || '';
  return value || (fallbackToTemplate ? dailyDocTemplate(type) : '');
}

function dailyDocPreview(date, type) {
  const value = dailyDocValue(date, type, false);
  const exists = type === 'review' ? dailyDocState(date).hasReview : dailyDocState(date).hasPlan;
  const title = type === 'review' ? 'Daily review document' : 'Daily plan document';
  return `
    <div class="doc-preview-card">
      <div class="section-head">
        <h4>${title}</h4>
        <div class="toolbar">
          ${exists
            ? `<button class="small danger" data-action="delete-daily-doc" data-date="${date}" data-doc-type="${type}">删除</button><button class="small ghost" data-action="open-daily-doc" data-date="${date}" data-doc-type="${type}">打开</button>`
            : `<button class="small ghost" data-action="open-daily-doc" data-date="${date}" data-doc-type="${type}">创建并打开</button>`}
        </div>
      </div>
      ${exists
        ? `<pre class="doc-preview">${escapeHtml(value || '空文件')}</pre>`
        : '<div class="empty">未创建</div>'}
    </div>
  `;
}

function cycleDocState(scope, key) {
  return {
    hasPlan: Boolean(findDocument(scope, key, 'plan')),
    hasReview: Boolean(findDocument(scope, key, 'review')),
  };
}

function cycleDocTemplate(scope, type) {
  return docTemplate(scope, type);
}

function cycleDocValue(scope, key, type) {
  return findDocument(scope, key, type)?.content || '';
}

function cycleDocTitle(scope, type) {
  if (scope === 'month') return type === 'review' ? 'Monthly review document' : 'Monthly planning document';
  return type === 'review' ? 'Weekly review document' : 'Weekly planning document';
}

function cycleDocSavedMessage(scope) {
  return scope === 'month' ? 'Monthly document saved' : 'Weekly document saved';
}

function cycleDocPreview(scope, key, type) {
  const value = cycleDocValue(scope, key, type);
  const docs = cycleDocState(scope, key);
  const exists = type === 'review' ? docs.hasReview : docs.hasPlan;
  return `
    <div class="doc-preview-card">
      <div class="section-head">
        <h4>${cycleDocTitle(scope, type)}</h4>
        <div class="toolbar">
          ${exists
            ? `<button class="small danger" data-action="delete-cycle-doc" data-scope="${scope}" data-key="${key}" data-doc-type="${type}">删除</button><button class="small ghost" data-action="open-cycle-doc" data-scope="${scope}" data-key="${key}" data-doc-type="${type}">打开</button>`
            : `<button class="small ghost" data-action="open-cycle-doc" data-scope="${scope}" data-key="${key}" data-doc-type="${type}">创建并打开</button>`}
        </div>
      </div>
      ${exists
        ? `<pre class="doc-preview">${escapeHtml(value || '空文件')}</pre>`
        : '<div class="empty">未创建</div>'}
    </div>
  `;
}

function visionDocTemplate() {
  return state.data.templates?.vision || '# Vision\n\n';
}

function visionDocPreview(doc) {
  return `
    <div class="doc-preview-card vision-doc-card">
      <div class="section-head">
        <div>
          <h4>${escapeHtml(docDisplayTitle(doc))}</h4>
          <p class="card-subtitle">更新于 ${displayDateTime(doc.updatedAt || doc.createdAt)}</p>
        </div>
        <div class="toolbar">
          <button class="small danger" data-action="delete" data-collection="documents" data-id="${doc.id}">删除</button>
          <button class="small ghost" data-action="open-vision-doc" data-id="${doc.id}">打开</button>
        </div>
      </div>
      <pre class="doc-preview">${escapeHtml(doc.content || '空文件')}</pre>
    </div>
  `;
}

function summarizeWeek(weekStart) {
  const days = weekDates(weekStart).map((date) => ({ date, ...summarizeDate(date) }));
  return {
    days,
    focusMinutes: days.reduce((sum, day) => sum + day.focusMinutes, 0),
    totalMinutes: days.reduce((sum, day) => sum + day.totalMinutes, 0),
    taskCount: days.reduce((sum, day) => sum + day.dailyTasks.length, 0),
    completedCount: days.reduce((sum, day) => sum + day.completed, 0),
  };
}

function renderNav() {
  $('#nav').innerHTML = NAV.map((item) => `
    <button class="${state.page === item.id ? 'active' : ''}" data-page="${item.id}">
      <span class="nav-icon">${navIcon(item.id)}</span>
      <span class="nav-label">${t(item.label)}</span>
    </button>
  `).join('');
  $$('#nav button').forEach((button) => {
    button.addEventListener('click', () => {
      state.page = button.dataset.page;
      // The right sidebar is an independent panel: switching pages must not
      // collapse it, change its mode, or close an open document.
      state.modal = null;
      render();
    });
  });
}

function applySidebarState() {
  const app = $('#app');
  const button = $('#sidebarToggle');
  const label = t(state.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar');
  app.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
  button.setAttribute('aria-expanded', String(!state.sidebarCollapsed));
  button.setAttribute('aria-label', label);
  button.title = label;
  button.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="3"></rect>
      <path d="${state.sidebarCollapsed ? 'M10 7v10' : 'M14 7v10'}"></path>
    </svg>
  `;
}

function pageTitle() {
  return t(NAV.find((item) => item.id === state.page)?.label || 'IterSelf');
}

function render() {
  applySettings();
  applySidebarState();
  const markdownSidebarActive = Boolean(state.markdownWorkspace || !state.markdownSidebarCollapsed);
  document.body.classList.toggle('markdown-sidebar-active', markdownSidebarActive);
  document.body.classList.toggle('markdown-sidebar-collapsed', Boolean(markdownSidebarActive && state.markdownSidebarCollapsed));
  const brandSubtitle = $('#brandSubtitle');
  if (brandSubtitle) brandSubtitle.textContent = t('Plan · Record · Review');
  renderNav();
  $('#pageTitle').textContent = pageTitle();
  $('#eyebrow').textContent = t(state.page === 'dashboard' ? 'Local-first desktop app' : 'Your data stays on this device');
  const rightSidebarToggle = $('#rightSidebarToggle');
  if (rightSidebarToggle) {
    rightSidebarToggle.hidden = false;
    rightSidebarToggle.setAttribute('aria-label', state.markdownSidebarCollapsed ? '展开右侧栏' : '折叠右侧栏');
    rightSidebarToggle.title = state.markdownSidebarCollapsed ? '展开右侧栏' : '折叠右侧栏';
    rightSidebarToggle.classList.toggle('collapsed', state.markdownSidebarCollapsed);
  }
  const renderers = {
    dashboard: renderDashboard,
    schedule: renderSchedule,
    month: renderMonth,
    okr: renderOkr,
    tasks: renderTasks,
    vision: renderVision,
    logs: renderLogs,
    settings: renderSettings,
  };
  destroyMarkdownWorkspaceEditor();
  const content = $('#content');
  const previousScrollTop = content.scrollTop;
  content.innerHTML = `${renderers[state.page]()}${markdownSidebarActive ? renderMarkdownWorkspace() : ''}${renderModal()}`;
  content.scrollTop = previousScrollTop;
  translateRenderedUi();
  bindPageEvents();
  mountMarkdownWorkspaceEditor();
}

const MARKDOWN_WORKSPACE_EDITOR_ID = 'markdownWorkspace';

function markdownEditorApi() {
  return window.IterSelfMarkdownEditor || null;
}

function destroyMarkdownWorkspaceEditor() {
  markdownEditorApi()?.destroy(MARKDOWN_WORKSPACE_EDITOR_ID);
}

function mountMarkdownWorkspaceEditor() {
  if (!state.markdownWorkspace) return;
  const host = $('#markdownWorkspaceContent');
  const api = markdownEditorApi();
  if (!host || !api) return;
  api.mount(MARKDOWN_WORKSPACE_EDITOR_ID, host, markdownWorkspaceValue(state.markdownWorkspace));
}

function markdownWorkspaceEditorValue() {
  const api = markdownEditorApi();
  if (api) return api.getValue(MARKDOWN_WORKSPACE_EDITOR_ID);
  return $('#markdownWorkspaceContent')?.value || '';
}

function setMarkdownWorkspaceEditorValue(value) {
  const api = markdownEditorApi();
  if (api?.setValue(MARKDOWN_WORKSPACE_EDITOR_ID, value)) return;
  const editor = $('#markdownWorkspaceContent');
  if (editor) editor.value = value;
}

function sidebarModeHead() {
  const en = state.data?.settings?.language === 'en';
  const mode = state.sidebarPanel === 'timeline' ? 'timeline' : 'md';
  return `
    <div class="markdown-workspace-head">
      <button type="button" class="small ghost markdown-mode-button ${mode === 'md' ? 'active' : ''}" data-action="set-sidebar-panel" data-panel="md">md</button>
      <button type="button" class="small ghost markdown-mode-button ${mode === 'timeline' ? 'active' : ''}" data-action="set-sidebar-panel" data-panel="timeline">${en ? 'day' : '时间轴'}</button>
    </div>
  `;
}

function renderSidebarTimeline() {
  const en = state.data?.settings?.language === 'en';
  const date = activeDate();
  const today = calendarDateIso(new Date());
  const schedules = collection('scheduleBlocks').filter((block) => block.date === date).sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));
  const entries = collection('timeEntries').filter((entry) => entry.date === date).sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));
  const summary = summarizeDate(date);
  // A viewport onto the day (ManicTime-style): defaults to the full
  // 00:00–24:00, zoomable with Shift+wheel and pannable with Ctrl+wheel;
  // the scrubber on the right shows and controls the window.
  const range = timelineViewRange();
  const size = range.end - range.start;
  const heading = `
    <div class="markdown-workspace-innerbar">
      <div class="markdown-workspace-title">
        <p>${en ? 'Timeline' : '时间轴'}</p>
        <h2>${escapeHtml(date)}${date === today ? ` · ${en ? 'today' : '今天'}` : ''}</h2>
      </div>
      <div class="markdown-workspace-actions"><span class="badge focus">${en ? 'Focus' : '专注'} ${escapeHtml(formatMinutes(summary.focusMinutes))}</span></div>
    </div>
  `;
  const hourMarks = timelineHourMarks(range, timelineViewStep(size));
  const nowMinutes = timeToMinutes(nowTime());
  const showNow = date === today && nowMinutes !== null && nowMinutes >= range.start && nowMinutes <= range.end;
  const nowLine = showNow
    ? `<div class="timeline-now-line" style="top:${timelinePercent(nowMinutes, range)}%;"><span>${escapeHtml(nowTime())}</span></div>`
    : '';
  // An hour label sitting under the now-line label is unreadable — the
  // dashed line stays, only the colliding text yields.
  const axisMarks = hourMarks.filter((minute) => !(showNow && Math.abs(minute - nowMinutes) < size / 40));
  const scrubberMark = (item, cls) => {
    const start = timeToMinutes(item.start);
    const duration = minutesBetween(item.start, item.end);
    if (start === null || duration <= 0) return '';
    return `<div class="scrubber-mark ${cls}" style="top:${(start / (24 * 60)) * 100}%;height:${Math.max(0.6, (duration / (24 * 60)) * 100)}%;"></div>`;
  };
  return `
    ${heading}
    <div class="sidebar-timeline">
      <div class="day-timeline-body sidebar-timeline-body" data-timeline-viewport>
        <div class="timeline-axis">
          ${axisMarks.map((minute) => `<div class="timeline-hour-label" style="top:${timelinePercent(minute, range)}%;">${timelineAxisLabel(minute)}</div>`).join('')}
        </div>
        <div class="timeline-track planned-track">
          ${hourMarks.map((minute) => `<div class="timeline-hour-line" style="top:${timelinePercent(minute, range)}%;"></div>`).join('')}
          ${schedules.map((block) => timelineBlock(block, 'scheduleBlocks', 'Schedule block', range)).join('')}
        </div>
        <div class="timeline-track actual-track">
          ${hourMarks.map((minute) => `<div class="timeline-hour-line" style="top:${timelinePercent(minute, range)}%;"></div>`).join('')}
          ${entries.map((entry) => timelineBlock(entry, 'timeEntries', 'Time record', range)).join('')}
        </div>
        ${nowLine}
      </div>
      <div class="timeline-scrubber" data-timeline-scrubber title="${en ? 'Drag to move the window · double-click to reset' : '拖动移动窗口 · 双击复位全天'}">
        ${schedules.map((block) => scrubberMark(block, 'planned')).join('')}
        ${entries.map((entry) => scrubberMark(entry, 'actual')).join('')}
        <div class="scrubber-thumb" data-scrubber-thumb style="top:${(range.start / (24 * 60)) * 100}%;height:${(size / (24 * 60)) * 100}%;">
          <div class="scrubber-handle top" data-scrubber-handle="start"></div>
          <div class="scrubber-handle bottom" data-scrubber-handle="end"></div>
        </div>
      </div>
    </div>
  `;
}

function renderMarkdownWorkspace() {
  if (state.sidebarPanel === 'timeline') {
    return `
      <section class="markdown-workspace">
        ${sidebarModeHead()}
        <div class="markdown-workspace-body">
          ${renderSidebarTimeline()}
        </div>
      </section>
    `;
  }
  const doc = state.markdownWorkspace;
  const visionDoc = doc?.kind === 'vision'
    ? collection('documents').find((item) => item.id === doc.id)
    : null;
  if (!doc) {
    return `
      <section class="markdown-workspace">
        ${sidebarModeHead()}
        <div class="markdown-workspace-body">
          <div class="markdown-workspace-innerbar">
            <div class="markdown-workspace-title">
              <p>Markdown</p>
              <h2>未打开文档</h2>
            </div>
          </div>
          <div class="empty markdown-workspace-empty">从左侧打开一个 Markdown 文档。</div>
        </div>
      </section>
    `;
  }
  return `
    <section class="markdown-workspace">
      ${sidebarModeHead()}
      <div class="markdown-workspace-body">
        <div class="markdown-workspace-innerbar">
          <div class="markdown-workspace-title">
            <p>Markdown</p>
            ${doc.kind === 'vision'
              ? `<input id="markdownWorkspaceTitleInput" class="markdown-inline-title" value="${escapeHtml(visionDoc?.title || '')}" placeholder="未命名" aria-label="文档标题" />`
              : `<h2 title="${escapeHtml(markdownWorkspaceTitle(doc))}">${escapeHtml(markdownWorkspaceTitle(doc))}</h2>`}
          </div>
          <div class="markdown-workspace-actions">
            <button type="button" class="ghost" data-action="use-markdown-workspace-template">使用模板</button>
            <button data-action="save-markdown-workspace">保存</button>
          </div>
        </div>
        <div id="markdownWorkspaceContent" class="markdown-workspace-editor"></div>
      </div>
    </section>
  `;
}

function markdownWorkspaceTitle(doc) {
  if (!doc) return '';
  if (doc.kind === 'daily') {
    return `${doc.date} ${doc.type === 'review' ? '复盘文档' : '计划文档'}`;
  }
  if (doc.kind === 'vision') {
    const vision = collection('documents').find((item) => item.id === doc.id);
    return docDisplayTitle(vision);
  }
  return `${doc.key} ${t(cycleDocTitle(doc.scope, doc.type))}`;
}

function markdownWorkspaceValue(doc) {
  if (!doc) return '';
  if (doc.kind === 'daily') {
    return findDocument('day', doc.date, doc.type)?.content || '';
  }
  if (doc.kind === 'vision') {
    return collection('documents').find((item) => item.id === doc.id)?.content || '';
  }
  return findDocument(doc.scope, doc.key, doc.type)?.content || '';
}

function renderDashboard() {
  const day = summarizeDate(activeDate());
  const week = summarizeWeek(activeWeekStart());
  const relatedObjectives = objectivesForRange(activeDate(), activeDate());
  const weekDocs = cycleDocState('week', activeWeekStart());
  const weekPlan = weekDocs.hasPlan || weekDocs.hasReview;
  const currentEntries = day.entries.slice().sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));

  return `
    <div class="grid">
      <div class="grid four">
        ${statCard('Today focus', formatMinutes(day.focusMinutes), 'Focus categories only')}
        ${statCard('Week focus', formatMinutes(week.focusMinutes), state.data.settings?.language === 'en' ? `${week.completedCount}/${week.taskCount} daily tasks done` : `日任务完成 ${week.completedCount}/${week.taskCount}`)}
        ${statCard('Today records', day.entries.length, 'Actual time entries')}
        ${statCard('Insights', day.insights.length, 'Captured today')}
      </div>
      <div class="grid two">
        <section class="card">
          <h3>Today at a glance</h3>
          <p class="card-subtitle">Plan, objective records, and review live in one daily cycle.</p>
          <div class="list">
            ${currentEntries.length ? currentEntries.map((entry) => timeEntryRow(entry, false)).join('') : '<div class="empty">No time entries yet. Add your first objective record in Today.</div>'}
          </div>
        </section>
        <section class="card">
          <h3>Current week</h3>
          <p class="card-subtitle">${activeWeekStart()} · ${state.data.settings?.language === 'en' ? (weekPlan ? 'weekly plan ready' : 'no weekly plan') : (weekPlan ? '周计划已创建' : '暂无周计划')}</p>
          <table class="focus-table">
            <thead><tr><th>Day</th><th>Focus</th><th>Tasks</th><th>Records</th></tr></thead>
            <tbody>
              ${week.days.map((daySummary) => `<tr><td>${daySummary.date}</td><td>${formatMinutes(daySummary.focusMinutes)}</td><td>${daySummary.completed}/${daySummary.dailyTasks.length}</td><td>${daySummary.entries.length}</td></tr>`).join('')}
            </tbody>
          </table>
        </section>
      </div>
      <section class="card">
        <h3>Related OKR</h3>
        <div class="list">${relatedObjectives.length ? relatedObjectives.map((objective, index) => objectiveReadonlyRow(objective, index)).join('') : '<div class="empty">No related objectives.</div>'}</div>
      </section>
    </div>
  `;
}

function statCard(label, value, hint) {
  return `<section class="card stat"><div class="value">${escapeHtml(value)}</div><div class="label">${escapeHtml(t(label))}</div><div class="row-meta">${escapeHtml(t(hint))}</div></section>`;
}

function renderSchedule() {
  const detail = state.scheduleScope === 'day' ? renderScheduleDay() : renderScheduleWeek();
  return `
    <div class="grid">
      ${scheduleTimeline()}
      ${detail}
    </div>
  `;
}

function scheduleTimeline() {
  const weekStart = activeWeekStart();
  const date = activeDate();
  const today = calendarDateIso(new Date());
  const days = weekDates(weekStart);
  const en = state.data?.settings?.language === 'en';
  return `
    <section class="card schedule-timeline">
      <div class="timeline-bar">
        <button class="small ghost" data-action="schedule-today">${state.scheduleScope === 'day' ? (en ? 'Today' : '今天') : (en ? 'This week' : '本周')}</button>
        <div class="timeline-center">
          <button class="small ghost" data-action="schedule-prev" aria-label="${en ? 'Previous week' : '上一周'}">←</button>
          <div class="timeline-title">${escapeHtml(weekTitle(weekStart))}</div>
          <button class="small ghost" data-action="schedule-next" aria-label="${en ? 'Next week' : '下一周'}">→</button>
        </div>
        <div class="timeline-scope">
          <button class="scope-chip ${state.scheduleScope === 'week' ? 'active' : ''}" data-action="schedule-set-scope" data-scope="week">${en ? 'Week' : '周'}</button>
          <button class="scope-chip ${state.scheduleScope === 'day' ? 'active' : ''}" data-action="schedule-set-scope" data-scope="day">${en ? 'Day' : '日'}</button>
        </div>
      </div>
      <div class="timeline-days">
        ${days.map((day) => `
          <button class="ghost timeline-day ${state.scheduleScope === 'week' || day === date ? 'active' : ''} ${day === today ? 'today' : ''}" data-action="schedule-select-day" data-date="${day}">
            <span>${shortDayLabel(day)}</span>
            <small>${Number(day.slice(8))}${day === today ? ` · ${en ? 'today' : '今'}` : ''}</small>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function renderScheduleWeek() {
  const weekStart = activeWeekStart();
  const week = summarizeWeek(weekStart);
  const bindings = collection('weeklyTaskBindings').filter((item) => item.weekStart === weekStart);
  return `
    <div class="grid">
      <section class="card">
        <h3>Set weekly tasks</h3>
        ${weeklyTaskForm(weekStart)}
        <div class="hr"></div>
        <div class="list">${bindings.length ? bindings.map(weeklyTaskRow).join('') : '<div class="empty">Choose tasks from the task pool for this week.</div>'}</div>
      </section>
      <section class="card">
        <h3>本周概览</h3>
        <p class="card-subtitle">${weekStart}</p>
        <table class="focus-table">
          <thead><tr><th>日期</th><th>任务</th><th>时间记录</th><th>专注时长</th><th>心得记录</th><th>规划</th><th>复盘</th></tr></thead>
          <tbody>
            ${week.days.map((daySummary) => weekOverviewRow(daySummary)).join('')}
          </tbody>
        </table>
      </section>
      <div class="grid two">
        <section class="card">
          ${cycleDocPreview('week', weekStart, 'plan')}
        </section>
        <section class="card">
          ${cycleDocPreview('week', weekStart, 'review')}
        </section>
      </div>
    </div>
  `;
}

function weekOverviewRow(daySummary) {
  const docs = dailyDocState(daySummary.date);
  return `
    <tr>
      <td>${daySummary.date}</td>
      <td>${daySummary.completed}/${daySummary.dailyTasks.length}</td>
      <td>${daySummary.entries.length}</td>
      <td>${formatMinutes(daySummary.focusMinutes)}</td>
      <td>${daySummary.insights.length}</td>
      <td>${docs.hasPlan ? '✓' : '-'}</td>
      <td>${docs.hasReview ? '✓' : '-'}</td>
    </tr>
  `;
}

function renderScheduleDay() {
  const date = activeDate();
  const summary = summarizeDate(date);
  const dayTasks = collection('dailyTaskBindings').filter((binding) => binding.date === date);
  const schedules = collection('scheduleBlocks').filter((block) => block.date === date).sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));
  const entries = summary.entries.slice().sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));
  const insights = summary.insights.slice().sort((a, b) => `${a.timestamp}`.localeCompare(`${b.timestamp}`));
  return `
    <div class="grid">
      <section class="card">
        <h3>Daily tasks</h3>
        ${dailyTaskForm(date)}
        <div class="hr"></div>
        <div class="list">${dayTasks.length ? dayTasks.map(dailyTaskRow).join('') : '<div class="empty">No daily tasks. Bind one from the task pool.</div>'}</div>
      </section>
      <section class="card">
        ${dayArrangementComparison(schedules, entries)}
      </section>
      <section class="card">
        <div class="section-head">
          <h3>Insights</h3>
          <div class="toolbar"><button class="small secondary" data-action="open-insight-modal">+ ${t('Insights')}</button></div>
        </div>
        <div class="hr"></div>
        <div class="list">${insights.length ? insights.map(insightRow).join('') : '<div class="empty">Capture thoughts, problems, tiny observations. They appear here for review.</div>'}</div>
      </section>
      <section class="card">
        <h3>${t('Daily plan document')} / ${t('Daily review document')}</h3>
        <div class="timeline-compare">
          ${dailyDocPreview(date, 'plan')}
          ${dailyDocPreview(date, 'review')}
        </div>
      </section>
    </div>
  `;
}

function renderModal() {
  if (!state.modal) return '';
  const date = activeDate();
  const task = collection('tasks').find((item) => item.id === state.selectedTaskId);
  const confirmTask = collection('tasks').find((item) => item.id === state.confirmDeleteTaskId);
  const selectedScheduleBlock = collection('scheduleBlocks').find((item) => item.id === state.selectedScheduleBlockId);
  const selectedTimeEntry = collection('timeEntries').find((item) => item.id === state.selectedTimeEntryId);
  const dailyDoc = state.selectedDailyDocDate
    ? findDocument('day', state.selectedDailyDocDate, state.selectedDailyDocType)
    : null;
  const cycleDoc = state.selectedCycleDocScope && state.selectedCycleDocKey
    ? findDocument(state.selectedCycleDocScope, state.selectedCycleDocKey, state.selectedCycleDocType)
    : null;
  const modalContent = {
    schedule: {
      title: selectedScheduleBlock ? '编辑日计划' : 'Add schedule block',
      body: scheduleForm(date, selectedScheduleBlock),
    },
    insight: { title: 'Add insight', body: insightForm(date) },
    'time-entry': {
      title: selectedTimeEntry ? '编辑时间记录' : 'Add time record',
      body: timeEntryForm(date, selectedTimeEntry),
    },
    objective: {
      title: state.selectedObjectiveId ? 'Edit objective' : 'Add objective',
      body: objectiveForm(collection('objectives').find((item) => item.id === state.selectedObjectiveId)),
    },
    kr: {
      title: state.selectedKrId ? 'Key result detail' : 'Add key result',
      body: krForm(
        state.selectedKrObjectiveId,
        collection('keyResults').find((item) => item.id === state.selectedKrId)
      ),
    },
    task: { title: state.taskEditorMode === 'create' ? 'Add task' : 'Edit task', body: taskEditor(task) },
    'confirm-delete-task': confirmTask ? {
      title: '确认删除任务',
      body: confirmDeleteTaskBody(confirmTask),
    } : null,
    'daily-doc': state.selectedDailyDocDate ? {
      title: `${state.selectedDailyDocDate} ${state.selectedDailyDocType === 'review' ? '复盘文档' : '计划文档'}`,
      body: dailyDocModalBody(dailyDoc, state.selectedDailyDocType),
    } : null,
    'cycle-doc': state.selectedCycleDocScope && state.selectedCycleDocKey ? {
      title: `${state.selectedCycleDocKey} ${t(cycleDocTitle(state.selectedCycleDocScope, state.selectedCycleDocType))}`,
      body: cycleDocModalBody(cycleDoc, state.selectedCycleDocScope, state.selectedCycleDocType),
    } : null,
  }[state.modal];
  if (!modalContent) return '';
  return `
    <div class="modal-backdrop" role="presentation">
      <section class="modal-card modal-${state.modal}" role="dialog" aria-modal="true">
        <div class="section-head">
          <h3>${t(modalContent.title)}</h3>
          <button class="small ghost" data-action="close-modal" aria-label="Close">×</button>
        </div>
        <div class="hr"></div>
        ${modalContent.body}
      </section>
    </div>
  `;
}

function dailyDocModalBody(doc, type) {
  const value = doc?.content || '';
  return `
    <div class="form-grid">
      <label class="span2">Markdown<textarea id="dailyDocModalContent" class="doc-editor" data-format="markdown">${escapeHtml(value)}</textarea></label>
      <div class="span2 toolbar">
        <button type="button" class="ghost" data-action="use-daily-doc-template">使用模板</button>
        <button data-action="save-daily-doc-modal">保存</button>
      </div>
    </div>
  `;
}

function cycleDocModalBody(doc, scope, type) {
  const value = doc?.content || '';
  return `
    <div class="form-grid">
      <label class="span2">Markdown<textarea id="cycleDocModalContent" class="doc-editor" data-format="markdown">${escapeHtml(value)}</textarea></label>
      <div class="span2 toolbar">
        <button type="button" class="ghost" data-action="use-cycle-doc-template" data-scope="${scope}" data-doc-type="${type}">使用模板</button>
        <button data-action="save-cycle-doc-modal">保存</button>
      </div>
    </div>
  `;
}

function confirmDeleteTaskBody(task) {
  const impact = taskDeleteImpact(task.id);
  return `
    <div class="confirm-body">
      <p>任务「${escapeHtml(taskDisplayTitle(task))}」仍有关联数据。确认后会删除它和全部子任务。</p>
      <ul class="impact-list">
        ${impact.childTasks ? `<li>子任务：${impact.childTasks}</li>` : ''}
        ${impact.weeklyTaskBindings ? `<li>周任务引用：${impact.weeklyTaskBindings}</li>` : ''}
        ${impact.dailyTaskBindings ? `<li>日任务引用：${impact.dailyTaskBindings}</li>` : ''}
        ${impact.scheduleBlocks ? `<li>日计划引用：${impact.scheduleBlocks}</li>` : ''}
        ${impact.timeEntries ? `<li>时间记录引用：${impact.timeEntries}（保留记录，解除任务绑定）</li>` : ''}
        ${impact.insights ? `<li>心得引用：${impact.insights}（保留心得，解除任务绑定）</li>` : ''}
      </ul>
      <p class="row-meta">删除后不可恢复。这个按钮不该误点，确认再按。</p>
      <div class="toolbar">
        <button class="ghost" data-action="cancel-delete-task">取消</button>
        <button class="danger" data-action="confirm-delete-task">确认删除</button>
      </div>
    </div>
  `;
}

function dailyTaskForm(date) {
  return `
    <form data-form="daily-task" class="form-grid">
      <input type="hidden" name="date" value="${escapeHtml(date)}" />
      <label class="span2">Task from pool<select name="taskId" required>${optionList(taskOptions(), '')}</select></label>
      <div class="span2"><button type="submit">Add daily task</button></div>
    </form>
  `;
}

function weekDailyOverview(weekStart) {
  return `
    <div class="list">
      ${weekDates(weekStart).map((day) => {
        const summary = summarizeDate(day);
        const rows = collection('dailyTaskBindings').filter((binding) => binding.date === day);
        const entries = summary.entries.slice().sort((a, b) => `${a.start}`.localeCompare(`${b.start}`));
        const insights = summary.insights.slice().sort((a, b) => `${a.timestamp}`.localeCompare(`${b.timestamp}`));
        return `
          <div class="row week-day-overview">
            <div class="row-title">${shortDayLabel(day)} · ${day}</div>
            ${dailyTaskForm(day)}
            <div class="week-day-columns">
              <div>
                <h4>Daily tasks</h4>
                <div class="list">${rows.length ? rows.map(dailyTaskRow).join('') : `<div class="row-meta">${t('No daily tasks. Bind one from the task pool.')}</div>`}</div>
              </div>
              <div>
                <h4>Time records</h4>
                <div class="list">${entries.length ? entries.map((entry) => timeEntryRow(entry, false)).join('') : `<div class="row-meta">${t('No objective records yet.')}</div>`}</div>
              </div>
              <div>
                <h4>Insights</h4>
                <div class="list">${insights.length ? insights.map(insightRow).join('') : `<div class="row-meta">${t('Capture thoughts, problems, tiny observations. They appear here for review.')}</div>`}</div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function dayArrangementComparison(schedules, entries) {
  return `
    <div class="timeline-compare">
      <div>
        ${scheduleColumnHead('Schedule blocks', 'open-schedule-modal')}
        <div class="list">${schedules.length ? schedules.map(scheduleRow).join('') : '<div class="empty compact">—</div>'}</div>
      </div>
      <div>
        ${scheduleColumnHead('Time records', 'open-time-entry-modal')}
        <div class="list">${entries.length ? entries.map((entry) => timeEntryRow(entry, true)).join('') : '<div class="empty compact">—</div>'}</div>
      </div>
    </div>
  `;
}

function scheduleColumnHead(label, action) {
  return `
    <div class="column-head">
      <h3>${t(label)}</h3>
      <button class="small secondary" data-action="${action}">+ ${t(label)}</button>
    </div>
  `;
}

// The timeline always shows the viewport window, never implicitly the
// whole day: the window persists across launches, and a fresh profile
// starts with 6 hours centred on now. Full-day is an explicit choice
// (double-click the scrubber).
function timelineViewRange() {
  if (!state.timelineView) {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('timelineView') || 'null');
    } catch (error) {
      saved = null;
    }
    if (saved && Number.isFinite(saved.start) && Number.isFinite(saved.end) && saved.end > saved.start) {
      setTimelineView(saved.start, saved.end);
    } else {
      const now = timeToMinutes(nowTime()) ?? 12 * 60;
      setTimelineView(now - 180, now + 180);
    }
  }
  return state.timelineView;
}

function setTimelineView(start, end) {
  const size = Math.min(24 * 60, Math.max(60, Math.round(end - start)));
  let next = Math.round(start);
  if (next < 0) next = 0;
  if (next + size > 24 * 60) next = 24 * 60 - size;
  state.timelineView = { start: next, end: next + size };
  localStorage.setItem('timelineView', JSON.stringify(state.timelineView));
}

// Denser hour marks as the viewport zooms in.
function timelineViewStep(size) {
  if (size >= 960) return 120;
  if (size >= 480) return 60;
  if (size >= 180) return 30;
  return 15;
}

function timelineAxisLabel(minute) {
  if (minute === 24 * 60) return '24:00';
  return `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
}

function timelineHourMarks(range, stepMinutes = 60) {
  const first = Math.ceil(range.start / stepMinutes) * stepMinutes;
  const marks = [];
  for (let minute = first; minute <= range.end; minute += stepMinutes) {
    marks.push(minute);
  }
  return marks;
}

function timelinePercent(minute, range) {
  return ((minute - range.start) / (range.end - range.start)) * 100;
}

function timelineBlock(item, collectionName, fallbackTitle, range) {
  const start = timeToMinutes(item.start);
  const duration = minutesBetween(item.start, item.end);
  if (start === null || duration <= 0) return '';
  const taskTitle = item.taskId ? getTaskPath(item.taskId) : '';
  const title = item.title || taskTitle || fallbackTitle;
  const focus = collectionName === 'timeEntries' && isFocusCategory(item.categoryId);
  const categoryTitle = collectionName === 'timeEntries' ? getCategoryPath(item.categoryId) : '';
  const top = timelinePercent(start, range);
  const height = (duration / (range.end - range.start)) * 100;
  return `
    <div class="timeline-block ${collectionName === 'timeEntries' ? 'actual' : 'planned'} ${focus ? 'focus' : ''}"
      style="top:${top}%; height:${height}%;"
      data-action="${collectionName === 'timeEntries' ? 'edit-time-entry' : 'edit-schedule-block'}" data-id="${item.id}"
      title="${escapeHtml(`${item.start}-${item.end} · ${title}`)}">
      <div class="timeline-block-title">${escapeHtml(title)}</div>
      <div class="timeline-block-meta">
        <span>${escapeHtml(`${item.start}-${item.end}`)}</span>
        <span>${formatMinutes(duration)}</span>
        ${categoryTitle ? `<span>${escapeHtml(categoryTitle)}</span>` : ''}
        ${item.note ? `<span>${escapeHtml(item.note)}</span>` : ''}
      </div>
      <button class="timeline-delete" data-action="delete" data-collection="${collectionName}" data-id="${item.id}" aria-label="Delete">×</button>
    </div>
  `;
}

function scheduleForm(date, block = null) {
  const mode = block ? 'edit' : 'create';
  return `
    <form data-form="schedule" data-mode="${mode}" data-id="${escapeHtml(block?.id || '')}" class="form-grid four">
      <input type="hidden" name="date" value="${escapeHtml(block?.date || date)}" />
      <label>Start${timeInput('start', block?.start || '09:00')}</label>
      <label>End${timeInput('end', block?.end || '10:00')}</label>
      <label class="span2">Bound task<select name="taskId">${optionList(taskOptions(), block?.taskId || '')}</select></label>
      <label class="span4">Note<input name="note" value="${escapeHtml(block?.note || '')}" placeholder="Optional note" /></label>
      <div class="span4"><button type="submit">${block ? '保存日计划' : 'Add block'}</button></div>
    </form>
  `;
}

function timeEntryForm(date, entry = null) {
  const mode = entry ? 'edit' : 'create';
  const timerStart = entry?.start || state.timer?.start || nowTime();
  return `
    ${entry ? '' : `<div class="toolbar">
      ${state.timer
        ? `<span class="badge focus">${state.data.settings?.language === 'en' ? 'Timer running since' : '计时开始于'} ${escapeHtml(state.timer.start)}</span><button class="small ghost" data-action="timer-cancel">Cancel timer</button>`
        : `<button class="small secondary" data-action="timer-start">Start timer now</button>`}
    </div>`}
    <form data-form="time-entry" data-mode="${mode}" data-id="${escapeHtml(entry?.id || '')}" class="form-grid four">
      <input type="hidden" name="date" value="${escapeHtml(entry?.date || date)}" />
      <label>Start${timeInput('start', timerStart)}</label>
      <label>End${timeInput('end', entry?.end || nowTime())}</label>
      <label>Name<input name="title" value="${escapeHtml(entry?.title || '')}" placeholder="Optional free title" /></label>
      <label>Bound task<select name="taskId">${optionList(taskOptions(), entry?.taskId || '')}</select></label>
      <label class="span4">Note<input name="note" value="${escapeHtml(entry?.note || '')}" placeholder="What objectively happened?" /></label>
      <div class="span4"><button type="submit">${entry ? '保存时间记录' : 'Add time record'}</button></div>
    </form>
  `;
}

function insightForm(date) {
  return `
    <form data-form="insight" class="form-grid four">
      <input type="hidden" name="date" value="${escapeHtml(date)}" />
      <label>Time${timeInput('time', nowTime())}</label>
      <label class="span3">Quick insight<textarea name="content" placeholder="A thought, question, small discovery, emotion, or pattern…" required></textarea></label>
      <label class="span2">Bound task<select name="taskId">${optionList(taskOptions(), '')}</select></label>
      <label class="span2">Bound time record<select name="timeEntryId">${optionList(timeEntryOptions(date), '')}</select></label>
      <label class="span4">Note<input name="note" placeholder="Optional note" /></label>
      <div class="span4"><button type="submit">Capture insight</button></div>
    </form>
  `;
}

function dailyTaskRow(binding) {
  return `
    <div class="row">
      <div class="row-header">
        <div>
          <div class="row-title">${escapeHtml(getTaskPath(binding.taskId))}</div>
        </div>
        <div class="row-actions">
          <button class="small danger" data-action="delete" data-collection="dailyTaskBindings" data-id="${binding.id}">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function scheduleRow(block) {
  const taskTitle = block.taskId ? getTaskPath(block.taskId) : '';
  const titleSuffix = taskTitle ? ` · ${escapeHtml(taskTitle)}` : '';
  return `
    <div class="row">
      <div class="row-header">
        <div>
          <div class="row-title">${block.start}-${block.end}${titleSuffix}</div>
          <div class="row-meta"><span class="badge">${formatMinutes(minutesBetween(block.start, block.end))}</span>${block.note ? ` ${escapeHtml(block.note)}` : ''}</div>
        </div>
        <div class="row-actions">
          <button class="small ghost" data-action="edit-schedule-block" data-id="${block.id}">编辑</button>
          <button class="small danger" data-action="delete" data-collection="scheduleBlocks" data-id="${block.id}">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function timeEntryRow(entry, deletable) {
  const focus = isFocusCategory(entry.categoryId);
  return `
    <div class="row">
      <div class="row-header">
        <div>
          <div class="row-title">${entry.start}-${entry.end} · ${escapeHtml(entry.title || getCategoryPath(entry.categoryId) || getTaskPath(entry.taskId) || 'Time record')}</div>
          <div class="row-meta">
            ${entry.categoryId ? `<span class="badge ${focus ? 'focus' : ''}">${t(focus ? 'focus' : 'non-focus')}</span>` : ''}
            <span class="badge">${formatMinutes(minutesBetween(entry.start, entry.end))}</span>
            ${entry.taskId ? `<span class="badge">${escapeHtml(getTaskPath(entry.taskId))}</span>` : ''}
            ${entry.note ? `<span>${escapeHtml(entry.note)}</span>` : ''}
          </div>
        </div>
        ${deletable ? `<div class="row-actions">
          <button class="small ghost" data-action="edit-time-entry" data-id="${entry.id}">编辑</button>
          <button class="small danger" data-action="delete" data-collection="timeEntries" data-id="${entry.id}">Delete</button>
        </div>` : ''}
      </div>
    </div>
  `;
}

function insightRow(insight) {
  const boundEntry = insight.timeEntryId ? collection('timeEntries').find((entry) => entry.id === insight.timeEntryId) : null;
  return `
    <div class="row">
      <div class="row-header">
        <div>
          <div class="row-title">${escapeHtml(insight.time || '') || displayDateTime(insight.timestamp)}</div>
          <div class="row-meta">
            ${escapeHtml(insight.content)}
            ${insight.taskId ? `<span class="badge">${escapeHtml(getTaskPath(insight.taskId))}</span>` : ''}
            ${boundEntry ? `<span class="badge">${escapeHtml(`${boundEntry.start}-${boundEntry.end} ${boundEntry.title || getTaskPath(boundEntry.taskId) || ''}`.trim())}</span>` : ''}
            ${insight.note ? `<span>${escapeHtml(insight.note)}</span>` : ''}
          </div>
        </div>
        <div class="row-actions"><button class="small danger" data-action="delete" data-collection="insights" data-id="${insight.id}">Delete</button></div>
      </div>
    </div>
  `;
}

function weeklyTaskForm(weekStart) {
  return `
    <form data-form="weekly-task" class="form-grid">
      <label class="span2">Task from pool<select name="taskId" required>${optionList(taskOptions(), '')}</select></label>
      <div class="span2"><button type="submit">Add weekly commitment</button></div>
    </form>
  `;
}

function weeklyTaskRow(binding) {
  return `
    <div class="row">
      <div class="row-header">
        <div>
          <div class="row-title">${escapeHtml(getTaskPath(binding.taskId))}</div>
        </div>
        <div class="row-actions"><button class="small danger" data-action="delete" data-collection="weeklyTaskBindings" data-id="${binding.id}">Delete</button></div>
      </div>
    </div>
  `;
}

function renderMonth() {
  const bounds = monthBounds();
  const relatedObjectives = objectivesForRange(bounds.start, bounds.end);

  return `
    <div class="grid">
      ${monthTimeline(bounds.monthKey)}
      <section class="card">
        <h3>Monthly related OKR</h3>
        <div class="list">${relatedObjectives.length ? relatedObjectives.map((objective, index) => objectiveReadonlyRow(objective, index)).join('') : '<div class="empty">No related objectives.</div>'}</div>
      </section>
      <div class="grid two">
        <section class="card">
          ${cycleDocPreview('month', bounds.monthKey, 'plan')}
        </section>
        <section class="card">
          ${cycleDocPreview('month', bounds.monthKey, 'review')}
        </section>
      </div>
    </div>
  `;
}

function monthTimeline(monthKey) {
  const pageStart = monthHalfStart(monthKey);
  const months = [0, 1, 2, 3, 4, 5].map((offset) => addMonths(pageStart, offset));
  return `
    <section class="card month-timeline">
      <button class="small ghost" data-action="month-prev">←</button>
      <div class="month-strip">
        ${months.map((item) => `
          <button class="month-chip ${item === monthKey ? 'active' : ''}" data-action="month-select" data-month="${item}">
            <strong>${escapeHtml(monthLabel(item))}</strong>
            <small>${item}</small>
          </button>
        `).join('')}
      </div>
      <button class="small ghost" data-action="month-next">→</button>
    </section>
  `;
}

function objectiveReadonlyRow(objective, objectiveIndex = 0) {
  const krs = collection('keyResults').filter((item) => item.objectiveId === objective.id);
  return `
    <div class="row" style="background:var(--panel)">
      <div class="row-title">O${objectiveIndex + 1}: ${escapeHtml(objective.title)}</div>
      <div class="row-meta"><span class="badge">${objective.startDate} → ${objective.endDate}</span>${objective.description ? escapeHtml(objective.description) : ''}</div>
      ${krs.map((kr, krIndex) => krReadonlyRow(kr, krIndex)).join('') || '<div class="empty">No key results.</div>'}
    </div>
  `;
}

function krReadonlyRow(kr, krIndex = 0) {
  const pct = kr.targetValue ? Math.min(100, Math.round((Number(kr.currentValue || 0) / Number(kr.targetValue || 1)) * 100)) : 0;
  return `
    <div class="row-meta" style="margin:8px 0">
      <strong>KR${krIndex + 1}:</strong> ${escapeHtml(kr.title)} · ${escapeHtml(kr.currentValue || 0)}/${escapeHtml(kr.targetValue || 0)} ${escapeHtml(kr.unit || '')}
      <div class="progress"><div style="width:${pct}%"></div></div>
    </div>
  `;
}

function renderOkr() {
  const objectives = collection('objectives').slice().sort((a, b) => `${a.startDate}`.localeCompare(`${b.startDate}`));
  return `
    <div class="grid">
      <section class="card">
        <div class="row-header">
          <div>
            <h3>OKR library</h3>
            <p class="card-subtitle">Objectives coexist independently. Each objective contains its own key results.</p>
          </div>
          <button class="small" data-action="open-objective-modal">+ ${t('Add objective')}</button>
        </div>
      </section>
      ${objectives.length ? objectives.map((objective, index) => objectiveRow(objective, index)).join('') : '<section class="card"><div class="empty">No objectives yet.</div></section>'}
    </div>
  `;
}

function objectiveForm(objective = null) {
  const mode = objective ? 'edit' : 'create';
  return `
    <form data-form="objective" data-mode="${mode}" data-objective-id="${escapeHtml(objective?.id || '')}" class="form-grid">
      <label class="span2">Objective<input name="title" value="${escapeHtml(objective?.title || '')}" placeholder="Objective" required /></label>
      <label>Start<input name="startDate" type="date" value="${escapeHtml(objective?.startDate || todayIso())}" required /></label>
      <label>End<input name="endDate" type="date" value="${escapeHtml(objective?.endDate || addDays(todayIso(), 30))}" required /></label>
      <label class="span2">Note<input name="description" value="${escapeHtml(objective?.description || '')}" placeholder="Optional" /></label>
      <div class="span2"><button type="submit">${mode === 'edit' ? t('Save') : t('Add objective')}</button></div>
    </form>
  `;
}

function objectiveRow(objective, objectiveIndex = 0) {
  const krs = collection('keyResults').filter((item) => item.objectiveId === objective.id);
  return `
    <section class="card objective-card">
      <div class="row-header">
        <div>
          <div class="row-title">O${objectiveIndex + 1}: ${escapeHtml(objective.title)}</div>
          ${objective.description ? `<div class="row-meta">${escapeHtml(objective.description)}</div>` : ''}
          <div class="row-meta"><span class="badge">${objective.startDate} → ${objective.endDate}</span></div>
        </div>
        <div class="row-actions">
          <button class="small ghost" data-action="edit-objective" data-id="${objective.id}">Edit</button>
          <button class="small danger" data-action="delete" data-collection="objectives" data-id="${objective.id}">Delete</button>
        </div>
      </div>
      <div class="kr-list">
        ${krs.map((kr, krIndex) => krRow(kr, krIndex)).join('') || '<div class="empty">No key results.</div>'}
      </div>
      <div class="kr-actions">
        <button class="small ghost" data-action="open-kr-modal" data-id="${objective.id}">${t('Add key result')}</button>
      </div>
    </section>
  `;
}

function krForm(objectiveId, kr = null) {
  const mode = kr ? 'edit' : 'create';
  return `
    <form data-form="kr" data-mode="${mode}" data-objective-id="${escapeHtml(objectiveId || kr?.objectiveId || '')}" data-kr-id="${escapeHtml(kr?.id || '')}" class="form-grid">
      <label class="span2">Name<input name="title" value="${escapeHtml(kr?.title || '')}" required placeholder="Measurable or checkable result" /></label>
      <label class="span2">Note<textarea name="note" placeholder="Optional note">${escapeHtml(kr?.note || '')}</textarea></label>
      <div class="span2 toolbar task-editor-actions">
        <button type="submit">${mode === 'edit' ? t('Save') : t('Add key result')}</button>
        ${mode === 'edit' ? `<button type="button" class="danger" data-action="delete" data-collection="keyResults" data-id="${escapeHtml(kr.id)}">${t('Delete')}</button>` : ''}
      </div>
    </form>
  `;
}

function krRow(kr, krIndex = 0) {
  return `
    <button class="kr-summary" data-action="open-kr-detail" data-id="${escapeHtml(kr.id)}">
      <div class="kr-summary-title">KR${krIndex + 1}: ${escapeHtml(kr.title)}</div>
      ${kr.note ? `<div class="kr-summary-note">${escapeHtml(kr.note)}</div>` : ''}
    </button>
  `;
}

function renderTasks() {
  const tasks = collection('tasks');
  const selectedTask = tasks.find((item) => item.id === state.selectedTaskId);
  const rows = visibleTaskTreeItems(tasks).map(({ item, depth, hasChildren }) => taskOverviewRow(item, depth, hasChildren)).join('');
  return `
    <div class="grid two task-layout">
      <section class="card task-overview-card">
        <div class="row-header">
          <div>
            <h3>Task overview</h3>
            <p class="card-subtitle">Inventory is not commitment. Weekly and daily plans bind from this pool.</p>
            <p class="card-subtitle">${t('Drag tasks to reorder or change hierarchy.')}</p>
          </div>
          <button class="small ghost" data-action="new-task">新建任务</button>
        </div>
        <div class="task-tree">${rows || '<div class="empty">No tasks yet.</div>'}</div>
      </section>
      <section class="card task-detail-card">
        <h3>${state.taskEditorMode === 'create' ? '新建任务' : '任务详情'}</h3>
        ${taskEditor(selectedTask)}
      </section>
    </div>
  `;
}

function taskOverviewRow(task, depth, hasChildren) {
  const done = normalizeTaskStatus(task.status) === 'done';
  const active = task.id === state.selectedTaskId;
  const collapsed = state.collapsedTaskIds.has(task.id);
  return `
    <div class="task-tree-item tree-depth-${Math.min(depth, 5)} ${done ? 'done' : ''} ${active ? 'active' : ''}" data-task-drag-id="${task.id}" draggable="true">
      <button class="task-complete" data-action="toggle-task-done" data-id="${task.id}" aria-label="${t(done ? 'Mark doing' : 'Mark complete')}" title="${t(done ? 'Mark doing' : 'Mark complete')}">${done ? '✓' : ''}</button>
      <button class="task-tree-content" data-action="select-task" data-id="${task.id}">
        <strong>${escapeHtml(taskDisplayTitle(task))}</strong>
      </button>
      ${hasChildren ? `<button class="task-chevron ${collapsed ? 'collapsed' : ''}" data-action="toggle-task-collapse" data-id="${task.id}" aria-label="${collapsed ? '展开子任务' : '收起子任务'}">⌄</button>` : ''}
    </div>
  `;
}

function taskEditor(task) {
  if (state.taskEditorMode === 'create') {
    const parentTask = collection('tasks').find((item) => item.id === state.newTaskParentId);
    return `
      <p class="row-meta">${parentTask ? `父任务：${escapeHtml(getTaskPath(parentTask.id))}` : '根任务'}</p>
      ${taskEditorForm({
        id: '',
        parentId: state.newTaskParentId || null,
        title: '',
        estimatedMinutes: 0,
        tags: '',
        status: 'doing',
        priority: 'none',
        note: '',
      }, 'create')}
    `;
  }

  if (!task) return `<div class="empty">${t('No task selected.')}</div>`;

  return `
    <p class="row-meta">${escapeHtml(getTaskPath(task.id))}</p>
    ${taskEditorForm(task, 'edit')}
  `;
}

function taskEditorForm(task, mode) {
  return `
    <form data-form="task-editor" data-mode="${mode}" data-task-id="${escapeHtml(task.id || '')}" data-parent-id="${escapeHtml(task.parentId || '')}" class="form-grid">
      <label class="span2">Title<input name="title" value="${escapeHtml(task.title || '')}" placeholder="填写任务名称" /></label>
      <label class="span2">Duration<input name="duration" value="${formatTaskDuration(task.estimatedMinutes)}" placeholder="30h 0m" required /></label>
      <label class="span2">Priority<select name="priority">${optionList(PRIORITIES, task.priority || 'none', null)}</select></label>
      <label class="span2">Status<select name="status">${optionList(TASK_STATUSES, normalizeTaskStatus(task.status), null)}</select></label>
      <label class="span2">Tags<input name="tags" value="${escapeHtml(taskTagsValue(task))}" placeholder="${t('Tags separated by commas')}" /></label>
      <label class="span2">Note<textarea name="note" placeholder="Optional note">${escapeHtml(task.note || '')}</textarea></label>
      <div class="span2 toolbar task-editor-actions">
        <button type="submit">${t('Save')}</button>
        ${mode === 'edit' ? `<button type="button" class="danger" data-action="delete" data-collection="tasks" data-id="${escapeHtml(task.id)}">${t('Delete')}</button>` : ''}
      </div>
    </form>
  `;
}

function renderCategorySettings() {
  const rows = treeItems(collection('eventCategories'), 'name').map(({ item, depth }) => categoryRow(item, depth)).join('');
  return `
    <div class="grid two">
      <section class="card">
        <h3>Event categories</h3>
        <p class="card-subtitle">Categories define what time means. Focus time is calculated from this tree.</p>
        ${categoryForm()}
      </section>
      <section class="card">
        <h3>Category tree</h3>
        <div class="list">${rows || '<div class="empty">No categories yet.</div>'}</div>
      </section>
    </div>
  `;
}

function renderLogs() {
  const timeLogs = collection('timeEntries').map((entry) => ({
    type: '时间记录',
    timestamp: `${entry.date}T${entry.end || entry.start || '00:00'}:00`,
    title: entry.title || getTaskPath(entry.taskId) || getCategoryPath(entry.categoryId) || '时间记录',
    meta: `${entry.date} ${entry.start || '—'}-${entry.end || '—'}`,
    note: entry.note || '',
  }));
  const insightLogs = collection('insights').map((entry) => ({
    type: '心得',
    timestamp: entry.timestamp || `${entry.date}T${entry.time || '00:00'}:00`,
    title: entry.content || '心得',
    meta: `${entry.date || ''} ${entry.time || ''}`.trim(),
    note: entry.note || '',
  }));
  const rows = [...timeLogs, ...insightLogs]
    .sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)))
    .map(logRow)
    .join('');
  return `
    <section class="card">
      <h3>日志</h3>
      <p class="card-subtitle">按时间倒序显示时间记录和心得。</p>
      <div class="list">${rows || '<div class="empty">暂无日志。</div>'}</div>
    </section>
  `;
}

function logRow(log) {
  return `
    <div class="row">
      <div class="row-title">${escapeHtml(log.title)}</div>
      <div class="row-meta"><span class="badge">${escapeHtml(log.type)}</span>${escapeHtml(log.meta)}</div>
      ${log.note ? `<div class="row-meta">${escapeHtml(log.note)}</div>` : ''}
    </div>
  `;
}

function categoryForm() {
  return `
    <form data-form="category" class="form-grid">
      <label>Parent<select name="parentId">${optionList(categoryOptions(), '')}</select></label>
      <label>Name<input name="name" required placeholder="Work / Deep Work" /></label>
      <label>Counts as focus?<select name="focus"><option value="true">Yes</option><option value="false">No</option></select></label>
      <label>Color<input name="color" type="color" value="#2f6f5e" /></label>
      <div class="span2"><button type="submit">Add category</button></div>
    </form>
  `;
}

function categoryRow(category, depth) {
  return `
    <div class="row tree-item tree-depth-${Math.min(depth, 5)}">
      <div class="row-header">
        <div>
          <div class="row-title"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${escapeHtml(category.color || '#999')};margin-right:8px"></span>${escapeHtml(category.name)}</div>
          <div class="row-meta"><span class="badge ${category.focus ? 'focus' : ''}">${t(category.focus ? 'focus' : 'non-focus')}</span>${escapeHtml(getCategoryPath(category.id))}</div>
        </div>
        <div class="row-actions">
          <button class="small ghost" data-action="toggle-category-focus" data-id="${category.id}">${t(category.focus ? 'Mark non-focus' : 'Mark focus')}</button>
          <button class="small danger" data-action="delete" data-collection="eventCategories" data-id="${category.id}">Delete</button>
        </div>
      </div>
    </div>
  `;
}

function renderVision() {
  const docs = collection('documents').filter((doc) => doc.scope === 'vision');
  return `
    <section class="card vision-page">
      <div class="row-header">
        <div>
          <h3>长期愿景文档</h3>
          <p class="card-subtitle">愿景、使命、方向都直接保存为 Markdown。</p>
        </div>
        <button class="small ghost" data-action="new-vision">新增文档</button>
      </div>
      ${docs.length
        ? `<div class="vision-doc-grid">${docs.map(visionDocPreview).join('')}</div>`
        : `<div class="empty vision-empty">
            <h4>暂无愿景文档</h4>
            <p>长期愿景不需要复杂字段，先开一篇 Markdown 写方向。</p>
          </div>`}
    </section>
  `;
}

function renderSettings() {
  const settings = state.data.settings || {};
  const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const timezoneOptions = Array.from(new Set([
    'system', systemTimezone, 'Asia/Shanghai', 'Asia/Tokyo', 'Asia/Singapore',
    'Europe/London', 'America/New_York', 'America/Los_Angeles', 'UTC',
  ]));
  const timezoneLabels = timezoneOptions.map((value) => [
    value,
    value === 'system' ? `${t('System timezone')} (${systemTimezone})` : value,
  ]);

  return `
    <div class="grid">
      <section class="card">
        <h3>${t('Appearance and locale')}</h3>
        <p class="card-subtitle">${t('Settings are saved locally and apply immediately.')}</p>
        <form data-form="settings" class="form-grid three">
          <label>${t('Language')}<select name="language">${optionList([['zh-CN', t('Chinese')], ['en', t('English')]], settings.language || 'zh-CN', null)}</select></label>
          <label>${t('Timezone')}<select name="timezone">${optionList(timezoneLabels, settings.timezone || 'system', null)}</select></label>
          <label>${t('Theme')}<select name="theme">${optionList([['system', t('Follow system')], ['light', t('Light')], ['dark', t('Dark')]], settings.theme || 'system', null)}</select></label>
          <div class="span3"><button type="submit">${t('Save settings')}</button></div>
        </form>
      </section>
      <section class="card">
        <h3>${t('Data management')}</h3>
        <p class="card-subtitle">${t('Export creates Markdown, JSON, and CSV files for analysis or migration.')}</p>
        <div class="settings-actions">
          <div class="row">
            <div>
              <div class="row-title">${t('Export data')}</div>
              <div class="row-meta">${t('Export folder')}: ${escapeHtml(state.exportDir || t('No folder selected'))}</div>
            </div>
            <div class="toolbar">
              <button class="ghost" data-action="choose-export-folder">${t('Choose folder')}</button>
              <button data-action="run-export" ${state.exportDir ? '' : 'disabled'}>${t('Export bundle')}</button>
            </div>
          </div>
          <div class="row">
            <div>
              <div class="row-title">${t('Create backup')}</div>
              <div class="row-meta">${t('Backup location')}: ${escapeHtml(state.backupPath || t('No backup created in this session'))}</div>
            </div>
            <div class="toolbar"><button data-action="create-backup">${t('Create backup')}</button></div>
          </div>
        </div>
      </section>
      ${renderCategorySettings()}
      <section class="card app-info">
        <h3>${t('Application information')}</h3>
        <div class="row-meta">${t('Version')} ${escapeHtml(state.appVersion || '—')}</div>
      </section>
    </div>
  `;
}

function bindPageEvents() {
  $$('form[data-form]').forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });
  $$('[data-action]').forEach((element) => {
    element.addEventListener('click', handleAction);
  });
  bindTimeInputEvents();
  bindTimelineViewEvents();
  bindTaskSelectionEvents();
  bindTaskDragEvents();
}

function bindTimelineViewEvents() {
  const container = $('.sidebar-timeline');
  if (!container) return;
  const viewport = container.querySelector('[data-timeline-viewport]');
  const scrubber = container.querySelector('[data-timeline-scrubber]');

  container.addEventListener('wheel', (event) => {
    if (!event.shiftKey && !event.ctrlKey) return;
    event.preventDefault();
    // Chromium reports Shift+vertical-wheel as deltaX.
    const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
    if (delta === 0) return;
    const view = timelineViewRange();
    const size = view.end - view.start;
    if (event.shiftKey) {
      const rect = viewport.getBoundingClientRect();
      const anchorRatio = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const anchor = view.start + size * anchorRatio;
      const nextSize = size * (delta > 0 ? 1.25 : 0.8);
      const start = anchor - anchorRatio * nextSize;
      setTimelineView(start, start + nextSize);
    } else {
      const step = Math.max(15, Math.round(size * 0.1)) * (delta > 0 ? 1 : -1);
      setTimelineView(view.start + step, view.end + step);
    }
    render();
  }, { passive: false });

  if (!scrubber) return;
  scrubber.addEventListener('dblclick', () => {
    setTimelineView(0, 24 * 60);
    render();
  });
  scrubber.addEventListener('pointerdown', (event) => {
    const rect = scrubber.getBoundingClientRect();
    const view = timelineViewRange();
    const size = view.end - view.start;
    const handle = event.target.closest('[data-scrubber-handle]');
    if (!handle && !event.target.closest('[data-scrubber-thumb]')) {
      const ratio = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const center = ratio * 24 * 60;
      setTimelineView(center - size / 2, center + size / 2);
      render();
      return;
    }
    event.preventDefault();
    const startY = event.clientY;
    const startView = { start: view.start, end: view.end };
    const resizeEdge = handle ? handle.dataset.scrubberHandle : null;
    // Drag survives re-renders because geometry is cached here and the
    // move/up listeners live on document, not on the replaced thumb.
    const onMove = (moveEvent) => {
      const deltaMinutes = ((moveEvent.clientY - startY) / rect.height) * 24 * 60;
      if (resizeEdge === 'start') {
        const nextStart = Math.min(startView.end - 60, Math.max(0, startView.start + deltaMinutes));
        setTimelineView(nextStart, startView.end);
      } else if (resizeEdge === 'end') {
        const nextEnd = Math.max(startView.start + 60, Math.min(24 * 60, startView.end + deltaMinutes));
        setTimelineView(startView.start, nextEnd);
      } else {
        setTimelineView(startView.start + deltaMinutes, startView.start + deltaMinutes + size);
      }
      render();
    };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });
}

function bindTimeInputEvents() {
  $$('[data-time-input]').forEach((input) => {
    const wrap = input.closest('[data-time-picker]');
    input.addEventListener('focus', () => {
      wrap?.classList.add('open');
      syncTimePicker(input);
    });
    input.addEventListener('click', () => {
      if (wrap && !wrap.classList.contains('open')) {
        wrap.classList.add('open');
        syncTimePicker(input);
      }
    });
    // Typing is never written back: wheels follow the typed value via
    // suppressed programmatic scrolls; only user scrolling commits.
    input.addEventListener('input', () => {
      if (normalizeTimeValue(input.value)) syncTimePicker(input);
    });
    input.addEventListener('wheel', (event) => {
      if (document.activeElement !== input) return; // don't hijack page scroll
      event.preventDefault();
      const step = event.shiftKey ? 60 : 5;
      input.value = addMinutesToTime(input.value, event.deltaY < 0 ? step : -step);
      syncTimePicker(input);
    }, { passive: false });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const normalized = normalizeTimeValue(input.value);
        if (normalized) input.value = normalized;
        wrap?.classList.remove('open');
        return;
      }
      if (event.key === 'Escape') {
        wrap?.classList.remove('open');
        return;
      }
      if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
      event.preventDefault();
      const step = event.shiftKey ? 60 : 5;
      input.value = addMinutesToTime(input.value, event.key === 'ArrowUp' ? step : -step);
      syncTimePicker(input);
    });
    input.addEventListener('blur', () => {
      const normalized = normalizeTimeValue(input.value);
      if (normalized) input.value = normalized;
    });
  });
  $$('[data-time-picker]').forEach((wrap) => {
    const input = wrap.querySelector('[data-time-input]');
    wrap.querySelectorAll('[data-time-part]').forEach((column) => {
      column.addEventListener('scroll', () => {
        if (column.falloffFrame) return;
        column.falloffFrame = requestAnimationFrame(() => {
          column.falloffFrame = null;
          updateWheelFalloff(column);
        });
      });
      column.addEventListener('scrollend', () => {
        updateWheelFalloff(column);
        if (column.suppressCommit) {
          column.suppressCommit = false;
          return;
        }
        const value = centeredColumnValue(column);
        if (input && value) setTimeInputPart(input, column.dataset.timePart, value);
      });
    });
    wrap.querySelectorAll('.time-col-item').forEach((item) => {
      item.addEventListener('mousedown', (event) => event.preventDefault());
      item.addEventListener('click', () => {
        const column = item.closest('[data-time-part]');
        if (!column) return;
        // Scroll the tapped value into the center band; the resulting
        // scrollend commits it through the same path as manual scrolling.
        const top = item.offsetTop - (column.clientHeight - item.offsetHeight) / 2;
        if (Math.abs(column.scrollTop - top) < 1) return;
        column.scrollTo({ top, behavior: 'smooth' });
      });
    });
    wrap.querySelectorAll('.time-quick-chip').forEach((chip) => {
      chip.addEventListener('mousedown', (event) => event.preventDefault());
      chip.addEventListener('click', () => {
        if (!input) return;
        input.value = nowTime();
        syncTimePicker(input);
        wrap.classList.remove('open');
      });
    });
    wrap.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!wrap.contains(document.activeElement)) wrap.classList.remove('open');
      }, 0);
    });
  });
  if (!document.body.dataset.timePickerOutsideBound) {
    document.body.dataset.timePickerOutsideBound = 'true';
    document.addEventListener('pointerdown', (event) => {
      if (event.target.closest('[data-time-picker]')) return;
      $$('[data-time-picker].open').forEach((wrap) => wrap.classList.remove('open'));
    });
  }
}

function clearTaskDropIndicators() {
  $$('[data-task-drag-id]').forEach((item) => item.classList.remove('drag-before', 'drag-inside', 'drag-after', 'dragging'));
}

function bindTaskDragEvents() {
  $$('[data-task-drag-id]').forEach((item) => {
    item.addEventListener('dragstart', (event) => {
      if (event.target.closest('.task-complete, .task-tree-content, .task-chevron')) {
        event.preventDefault();
        return;
      }
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', item.dataset.taskDragId);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', clearTaskDropIndicators);
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      clearTaskDropIndicators();
      const rect = item.getBoundingClientRect();
      const ratio = (event.clientY - rect.top) / rect.height;
      const position = ratio < 0.28 ? 'before' : ratio > 0.72 ? 'after' : 'inside';
      item.dataset.dropPosition = position;
      item.classList.add(`drag-${position}`);
    });
    item.addEventListener('drop', async (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const targetId = item.dataset.taskDragId;
      const position = item.dataset.dropPosition || 'inside';
      clearTaskDropIndicators();
      if (!taskId || taskId === targetId) return;
      await tryAction(async () => {
        state.data = await window.iterself.mutate({ type: 'moveTask', taskId, targetId, position });
        showToast('Saved');
        render();
      });
    });
  });
}

function bindTaskSelectionEvents() {
  $$('[data-task-drag-id]').forEach((item) => {
    item.addEventListener('click', (event) => {
      if (event.target.closest('.task-complete')) return;
      if (event.target.closest('.task-chevron')) return;
      if (event.target.closest('[data-action]')) return;
      state.selectedTaskId = state.selectedTaskId === item.dataset.taskDragId ? null : item.dataset.taskDragId;
      state.newTaskParentId = null;
      state.taskEditorMode = 'edit';
      state.modal = null;
      render();
    });
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const type = form.dataset.form;
  const values = Object.fromEntries(formData.entries());
  const timestamp = new Date().toISOString();

  if (type === 'objective' && values.endDate < values.startDate) {
    showToast(state.data.settings?.language === 'en' ? 'End date must not be before start date.' : '结束日期不能早于开始日期。');
    return;
  }

  if (type === 'settings') {
    await tryAction(async () => {
      state.data = await window.iterself.mutate({
        type: 'setSettings',
        patch: { language: values.language, timezone: values.timezone, theme: values.theme },
      });
      const today = todayIso();
      state.data = await window.iterself.mutate({
        type: 'setMeta',
        patch: { activeDate: today, activeWeekStart: startOfWeekIso(today) },
      });
      showToast(values.language === 'en' ? 'Settings saved' : '设置已保存');
      render();
    });
    return;
  }

  if (type === 'task-editor') {
    await tryAction(async () => {
      const estimatedMinutes = parseTaskDuration(values.duration);
      if (estimatedMinutes === null) throw new Error(state.data.settings?.language === 'en' ? 'Use a duration such as 2h 30m.' : '持续时间请填写为 2h 30m。');
      const taskPatch = {
        title: values.title.trim(),
        estimatedMinutes,
        tags: values.tags.split(',').map((tag) => tag.trim()).filter(Boolean).join(', '),
        status: values.status,
        priority: values.priority,
        note: values.note || '',
      };
      if (form.dataset.mode === 'create') {
        const parentId = form.dataset.parentId || null;
        const item = {
          id: uid('task'),
          parentId,
          sortOrder: collection('tasks').filter((task) => (task.parentId || null) === parentId).length,
          ...taskPatch,
        };
        state.data = await window.iterself.mutate({ type: 'upsert', collection: 'tasks', item });
        state.selectedTaskId = item.id;
        state.newTaskParentId = null;
        state.taskEditorMode = 'edit';
      } else {
        state.data = await window.iterself.mutate({ type: 'patch', collection: 'tasks', id: form.dataset.taskId, patch: taskPatch });
      }
      state.modal = null;
      showToast('Saved');
      render();
    });
    return;
  }

  if (type === 'objective') {
    await tryAction(async () => {
      const patch = {
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description || '',
      };
      if (form.dataset.mode === 'edit') {
        state.data = await window.iterself.mutate({ type: 'patch', collection: 'objectives', id: form.dataset.objectiveId, patch });
      } else {
        state.data = await window.iterself.mutate({ type: 'upsert', collection: 'objectives', item: { id: uid('obj'), ...patch } });
      }
      state.selectedObjectiveId = null;
      state.modal = null;
      showToast('Saved');
      render();
    });
    return;
  }

  if (type === 'kr') {
    await tryAction(async () => {
      const patch = {
        objectiveId: form.dataset.objectiveId,
        title: values.title,
        note: values.note || '',
      };
      if (form.dataset.mode === 'edit') {
        state.data = await window.iterself.mutate({ type: 'patch', collection: 'keyResults', id: form.dataset.krId, patch });
      } else {
        state.data = await window.iterself.mutate({ type: 'upsert', collection: 'keyResults', item: { id: uid('kr'), ...patch } });
      }
      state.selectedKrObjectiveId = null;
      state.selectedKrId = null;
      state.modal = null;
      showToast('Saved');
      render();
    });
    return;
  }

  if ((type === 'schedule' || type === 'time-entry') && !normalizeTimeFields(values, ['start', 'end'])) return;
  if (type === 'insight' && !normalizeTimeFields(values, ['time'])) return;

  if (type === 'schedule') {
    const existingScheduleBlock = collection('scheduleBlocks').find((item) => item.id === form.dataset.id);
    const patch = {
      date: values.date || activeDate(),
      start: values.start,
      end: values.end,
      taskId: values.taskId || null,
      title: values.title || existingScheduleBlock?.title || '',
      note: values.note || '',
    };
    if (form.dataset.mode === 'edit') {
      await mutate({ type: 'patch', collection: 'scheduleBlocks', id: form.dataset.id, patch }, 'Saved');
    } else {
      await mutate({ type: 'upsert', collection: 'scheduleBlocks', item: { id: uid('sb'), ...patch } }, 'Saved');
    }
    state.selectedScheduleBlockId = null;
    state.modal = null;
    render();
    return;
  }

  if (type === 'time-entry') {
    const existingTimeEntry = collection('timeEntries').find((item) => item.id === form.dataset.id);
    const patch = {
      date: values.date || activeDate(),
      start: values.start,
      end: values.end,
      title: values.title || '',
      categoryId: values.categoryId || existingTimeEntry?.categoryId || null,
      taskId: values.taskId || null,
      note: values.note || '',
    };
    if (form.dataset.mode === 'edit') {
      await mutate({ type: 'patch', collection: 'timeEntries', id: form.dataset.id, patch }, 'Saved');
    } else {
      await mutate({ type: 'upsert', collection: 'timeEntries', item: { id: uid('te'), ...patch } }, 'Saved');
    }
    state.selectedTimeEntryId = null;
    state.timer = null;
    state.modal = null;
    render();
    return;
  }

  const payloads = {
    'daily-task': () => ({ collection: 'dailyTaskBindings', item: { id: uid('dt'), date: values.date || activeDate(), taskId: values.taskId } }),
    insight: () => ({ collection: 'insights', item: { id: uid('ins'), timestamp: new Date(`${values.date || activeDate()}T${values.time || nowTime()}:00`).toISOString(), date: values.date || activeDate(), time: values.time || nowTime(), content: values.content, taskId: values.taskId || null, timeEntryId: values.timeEntryId || null, note: values.note || '' } }),
    'weekly-task': () => ({ collection: 'weeklyTaskBindings', item: { id: uid('wt'), weekStart: activeWeekStart(), taskId: values.taskId } }),
    task: () => ({ collection: 'tasks', item: { id: uid('task'), parentId: values.parentId || null, title: values.title, type: values.type, status: values.status, estimatedMinutes: Number(values.estimatedMinutes || 0), note: values.note || '' } }),
    category: () => ({ collection: 'eventCategories', item: { id: uid('cat'), parentId: values.parentId || null, name: values.name, focus: values.focus === 'true', color: values.color || '#2f6f5e' } }),
    vision: () => ({ collection: 'documents', item: { id: uid('doc'), scope: 'vision', key: null, type: 'free', title: values.title, content: values.content } }),
  };

  const payload = payloads[type]?.();
  if (!payload) return;
  await tryAction(async () => {
    if (type === 'insight' || type === 'objective') state.modal = null;
    await mutate({ type: 'upsert', collection: payload.collection, item: payload.item });
    form.reset();
  });
}

async function handleAction(event) {
  // Actions can nest (a delete button inside a clickable timeline block);
  // only the innermost action may run.
  event.stopPropagation();
  const el = event.currentTarget;
  const action = el.dataset.action;
  await tryAction(async () => {
    await runAction(action, el);
  });
}

async function runAction(action, el) {
  if (action === 'set-sidebar-panel') {
    state.sidebarPanel = el.dataset.panel === 'timeline' ? 'timeline' : 'md';
    localStorage.setItem('sidebarPanel', state.sidebarPanel);
    state.markdownSidebarCollapsed = false;
    render();
    return;
  }

  if (action === 'open-schedule-modal') {
    state.selectedScheduleBlockId = null;
    state.modal = 'schedule';
    render();
    return;
  }

  if (action === 'open-time-entry-modal') {
    state.selectedTimeEntryId = null;
    state.modal = 'time-entry';
    render();
    return;
  }

  if (action === 'edit-schedule-block') {
    state.selectedScheduleBlockId = el.dataset.id;
    state.modal = 'schedule';
    render();
    return;
  }

  if (action === 'edit-time-entry') {
    state.selectedTimeEntryId = el.dataset.id;
    state.modal = 'time-entry';
    render();
    return;
  }

  if (action === 'open-insight-modal') {
    state.modal = 'insight';
    render();
    return;
  }

  if (action === 'open-objective-modal') {
    state.selectedObjectiveId = null;
    state.selectedKrObjectiveId = null;
    state.selectedKrId = null;
    state.modal = 'objective';
    render();
    return;
  }

  if (action === 'open-kr-modal') {
    state.selectedKrObjectiveId = el.dataset.id;
    state.selectedKrId = null;
    state.selectedObjectiveId = null;
    state.modal = 'kr';
    render();
    return;
  }

  if (action === 'open-kr-detail') {
    const kr = collection('keyResults').find((item) => item.id === el.dataset.id);
    if (!kr) return;
    state.selectedKrId = kr.id;
    state.selectedKrObjectiveId = kr.objectiveId;
    state.selectedObjectiveId = null;
    state.modal = 'kr';
    render();
    return;
  }

  if (action === 'edit-objective') {
    state.selectedObjectiveId = el.dataset.id;
    state.selectedKrObjectiveId = null;
    state.selectedKrId = null;
    state.modal = 'objective';
    render();
    return;
  }

  if (action === 'close-modal') {
    state.selectedObjectiveId = null;
    state.selectedKrObjectiveId = null;
    state.selectedKrId = null;
    state.selectedDailyDocDate = null;
    state.selectedDailyDocType = null;
    state.selectedScheduleBlockId = null;
    state.selectedTimeEntryId = null;
    state.selectedCycleDocScope = null;
    state.selectedCycleDocKey = null;
    state.selectedCycleDocType = null;
    state.modal = null;
    render();
    return;
  }

  if (action === 'open-daily-doc') {
    const date = el.dataset.date;
    const type = el.dataset.docType;
    if (!findDocument('day', date, type)) {
      state.data = await window.iterself.mutate({
        type: 'upsert',
        collection: 'documents',
        item: { scope: 'day', key: date, type, title: '', content: '' },
      });
    }
    state.selectedDailyDocDate = date;
    state.selectedDailyDocType = type;
    state.markdownWorkspace = { kind: 'daily', date, type };
    state.sidebarPanel = 'md';
    state.markdownSidebarCollapsed = false;
    state.modal = null;
    render();
    return;
  }

  if (action === 'open-cycle-doc') {
    const scope = el.dataset.scope;
    const key = el.dataset.key;
    const type = el.dataset.docType;
    if (!findDocument(scope, key, type)) {
      state.data = await window.iterself.mutate({
        type: 'upsert',
        collection: 'documents',
        item: { scope, key, type, title: '', content: '' },
      });
    }
    state.selectedCycleDocScope = scope;
    state.selectedCycleDocKey = key;
    state.selectedCycleDocType = type;
    state.markdownWorkspace = { kind: 'cycle', scope, key, type };
    state.sidebarPanel = 'md';
    state.markdownSidebarCollapsed = false;
    state.modal = null;
    render();
    return;
  }

  if (action === 'close-markdown-workspace') {
    state.markdownWorkspace = null;
    state.markdownSidebarCollapsed = true;
    render();
    return;
  }

  if (action === 'toggle-markdown-sidebar') {
    state.markdownSidebarCollapsed = !state.markdownSidebarCollapsed;
    render();
    return;
  }

  if (action === 'schedule-set-scope') {
    state.scheduleScope = el.dataset.scope === 'day' ? 'day' : 'week';
    state.modal = null;
    render();
    return;
  }

  if (action === 'schedule-select-day') {
    const date = el.dataset.date;
    state.scheduleScope = 'day';
    state.modal = null;
    state.data = await window.iterself.mutate({ type: 'setMeta', patch: { activeDate: date, activeWeekStart: startOfWeekIso(date) } });
    render();
    return;
  }

  if (action === 'schedule-today') {
    const today = calendarDateIso(new Date());
    state.modal = null;
    state.data = await window.iterself.mutate({ type: 'setMeta', patch: { activeDate: today, activeWeekStart: startOfWeekIso(today) } });
    render();
    return;
  }

  // Arrows always move by week (keeping the same weekday selected); a
  // specific day is only ever chosen by clicking its chip.
  if (action === 'schedule-prev' || action === 'schedule-next') {
    const nextDate = addDays(activeDate(), action === 'schedule-prev' ? -7 : 7);
    state.modal = null;
    state.data = await window.iterself.mutate({ type: 'setMeta', patch: { activeDate: nextDate, activeWeekStart: startOfWeekIso(nextDate) } });
    render();
    return;
  }

  if (action === 'month-prev' || action === 'month-next') {
    const currentMonth = monthBounds().monthKey;
    const pageStart = monthHalfStart(currentMonth);
    const nextMonth = addMonths(pageStart, action === 'month-prev' ? -6 : 6);
    const nextDate = monthDate(nextMonth);
    state.modal = null;
    state.data = await window.iterself.mutate({ type: 'setMeta', patch: { activeDate: nextDate, activeWeekStart: startOfWeekIso(nextDate) } });
    render();
    return;
  }

  if (action === 'month-select') {
    const nextDate = monthDate(el.dataset.month);
    state.modal = null;
    state.data = await window.iterself.mutate({ type: 'setMeta', patch: { activeDate: nextDate, activeWeekStart: startOfWeekIso(nextDate) } });
    render();
    return;
  }

  if (action === 'select-task') {
    state.selectedTaskId = state.selectedTaskId === el.dataset.id ? null : el.dataset.id;
    state.newTaskParentId = null;
    state.taskEditorMode = 'edit';
    state.modal = null;
    render();
    return;
  }

  if (action === 'toggle-task-collapse') {
    const taskId = el.dataset.id;
    if (state.collapsedTaskIds.has(taskId)) state.collapsedTaskIds.delete(taskId);
    else state.collapsedTaskIds.add(taskId);
    render();
    return;
  }

  if (action === 'toggle-task-done') {
    const task = collection('tasks').find((item) => item.id === el.dataset.id);
    if (!task) return;
    const status = normalizeTaskStatus(task.status) === 'done' ? 'doing' : 'done';
    await mutate({ type: 'patch', collection: 'tasks', id: task.id, patch: { status } });
    return;
  }

  if (action === 'new-task') {
    const parentId = state.selectedTaskId || null;
    const item = {
      id: uid('task'),
      parentId,
      sortOrder: collection('tasks').filter((task) => (task.parentId || null) === parentId).length,
      title: '',
      estimatedMinutes: 0,
      tags: '',
      status: 'doing',
      priority: 'none',
      note: '',
    };
    state.data = await window.iterself.mutate({ type: 'upsert', collection: 'tasks', item });
    state.selectedTaskId = item.id;
    state.newTaskParentId = null;
    state.taskEditorMode = 'edit';
    state.modal = null;
    showToast('Saved');
    render();
    return;
  }

  if (action === 'cancel-delete-task') {
    state.confirmDeleteTaskId = null;
    state.modal = null;
    render();
    return;
  }

  if (action === 'confirm-delete-task') {
    const taskId = state.confirmDeleteTaskId;
    if (!taskId) return;
    if (taskId === state.selectedTaskId) state.selectedTaskId = null;
    if (taskId === state.newTaskParentId) state.newTaskParentId = null;
    state.confirmDeleteTaskId = null;
    state.modal = null;
    await mutate({ type: 'deleteTaskCascade', id: taskId }, 'Deleted');
    return;
  }

  if (action === 'delete') {
    if (el.dataset.collection === 'tasks') {
      const impact = taskDeleteImpact(el.dataset.id);
      if (impact.total > 0) {
        state.confirmDeleteTaskId = el.dataset.id;
        state.modal = 'confirm-delete-task';
        render();
        return;
      }
    }
    if (el.dataset.collection === 'keyResults' && el.dataset.id === state.selectedKrId) {
      state.selectedKrId = null;
      state.selectedKrObjectiveId = null;
      state.modal = null;
    }
    if (el.dataset.collection === 'tasks' && el.dataset.id === state.selectedTaskId) {
      state.selectedTaskId = null;
      state.taskEditorMode = 'edit';
      state.modal = null;
    }
    if (el.dataset.collection === 'tasks' && el.dataset.id === state.newTaskParentId) {
      state.newTaskParentId = null;
    }
    if (el.dataset.collection === 'documents' && el.dataset.id === state.selectedVisionId) {
      state.selectedVisionId = null;
    }
    if (el.dataset.collection === 'documents' && state.markdownWorkspace?.kind === 'vision' && el.dataset.id === state.markdownWorkspace.id) {
      state.markdownWorkspace = null;
      state.markdownSidebarCollapsed = true;
    }
    await mutate({ type: 'delete', collection: el.dataset.collection, id: el.dataset.id }, 'Deleted');
    return;
  }

  if (action === 'use-daily-doc-template') {
    const editor = $('#dailyDocModalContent');
    if (editor) editor.value = dailyDocTemplate(state.selectedDailyDocType);
    return;
  }

  if (action === 'use-cycle-doc-template') {
    const editor = $('#cycleDocModalContent');
    if (editor) editor.value = cycleDocTemplate(state.selectedCycleDocScope, state.selectedCycleDocType);
    return;
  }

  if (action === 'use-markdown-workspace-template') {
    const doc = state.markdownWorkspace;
    if (!doc) return;
    if (doc.kind === 'daily') {
      setMarkdownWorkspaceEditorValue(dailyDocTemplate(doc.type));
      return;
    }
    if (doc.kind === 'vision') {
      setMarkdownWorkspaceEditorValue(visionDocTemplate());
      return;
    }
    setMarkdownWorkspaceEditorValue(cycleDocTemplate(doc.scope, doc.type));
    return;
  }

  if (action === 'delete-daily-doc') {
    const existing = findDocument('day', el.dataset.date, el.dataset.docType);
    if (!existing) return;
    await mutate({ type: 'delete', collection: 'documents', id: existing.id }, 'Deleted');
    return;
  }

  if (action === 'delete-cycle-doc') {
    const existing = findDocument(el.dataset.scope, el.dataset.key, el.dataset.docType);
    if (!existing) return;
    await mutate({ type: 'delete', collection: 'documents', id: existing.id }, 'Deleted');
    return;
  }

  if (action === 'save-daily-doc-modal') {
    const date = state.selectedDailyDocDate;
    const type = state.selectedDailyDocType;
    const content = $('#dailyDocModalContent').value;
    state.selectedDailyDocDate = null;
    state.selectedDailyDocType = null;
    state.modal = null;
    await saveDocument('day', date, type, content, 'Daily document saved');
    return;
  }

  if (action === 'save-cycle-doc-modal') {
    const scope = state.selectedCycleDocScope;
    const key = state.selectedCycleDocKey;
    const type = state.selectedCycleDocType;
    const content = $('#cycleDocModalContent').value;
    state.selectedCycleDocScope = null;
    state.selectedCycleDocKey = null;
    state.selectedCycleDocType = null;
    state.modal = null;
    await saveDocument(scope, key, type, content, cycleDocSavedMessage(scope));
    return;
  }

  if (action === 'save-markdown-workspace') {
    const doc = state.markdownWorkspace;
    if (!doc) return;
    const value = markdownWorkspaceEditorValue();
    if (doc.kind === 'daily') {
      await saveDocument('day', doc.date, doc.type, value, 'Daily document saved');
      return;
    }
    if (doc.kind === 'vision') {
      const existing = collection('documents').find((item) => item.id === doc.id);
      if (!existing) return;
      await mutate({
        type: 'patch',
        collection: 'documents',
        id: doc.id,
        patch: {
          title: $('#markdownWorkspaceTitleInput')?.value || '',
          content: value,
        },
      }, 'Vision saved');
      return;
    }
    await saveDocument(doc.scope, doc.key, doc.type, value, cycleDocSavedMessage(doc.scope));
    return;
  }

  if (action === 'toggle-category-focus') {
    const category = collection('eventCategories').find((item) => item.id === el.dataset.id);
    await mutate({ type: 'patch', collection: 'eventCategories', id: el.dataset.id, patch: { focus: !category.focus } }, 'Focus rule updated');
    return;
  }

  if (action === 'open-vision-doc') {
    const doc = collection('documents').find((item) => item.id === el.dataset.id);
    if (!doc) return;
    state.selectedVisionId = doc.id;
    state.markdownWorkspace = { kind: 'vision', id: doc.id };
    state.sidebarPanel = 'md';
    state.markdownSidebarCollapsed = false;
    state.modal = null;
    render();
    return;
  }

  if (action === 'new-vision') {
    const item = { id: uid('doc'), scope: 'vision', key: null, type: 'free', title: '', content: '', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    state.data = await window.iterself.mutate({ type: 'upsert', collection: 'documents', item });
    state.selectedVisionId = item.id;
    state.markdownWorkspace = { kind: 'vision', id: item.id };
    state.sidebarPanel = 'md';
    state.markdownSidebarCollapsed = false;
    showToast('Saved');
    render();
    return;
  }

  if (action === 'choose-export-folder') {
    state.exportDir = await window.iterself.chooseExportFolder();
    render();
    return;
  }

  if (action === 'run-export') {
    const result = await window.iterself.exportBundle({ targetDir: state.exportDir });
    showToast(state.data.settings?.language === 'en' ? `Exported to ${result.outDir}` : `已导出到 ${result.outDir}`);
    await window.iterself.openPath(result.outDir);
    return;
  }

  if (action === 'create-backup') {
    state.backupPath = await window.iterself.createBackup();
    render();
    showToast(state.data.settings?.language === 'en' ? 'Backup created' : '备份已创建');
    return;
  }

  if (action === 'timer-start') {
    state.timer = { start: nowTime(), startedAt: Date.now() };
    render();
    showToast(state.data.settings?.language === 'en' ? `Timer started at ${state.timer.start}` : `计时开始于 ${state.timer.start}`);
    return;
  }

  if (action === 'timer-cancel') {
    state.timer = null;
    render();
    showToast('Timer cancelled');
    return;
  }
}

async function init() {
  state.data = await window.iterself.getData();
  state.appVersion = await window.iterself.getAppVersion();
  $('#sidebarToggle').addEventListener('click', () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    localStorage.setItem('sidebarCollapsed', String(state.sidebarCollapsed));
    applySidebarState();
  });

  // Self-heal on launch: align active date to today (local timezone) and
  // recompute the week start with the local-safe helper. This also repairs
  // any stale meta written by earlier UTC-based builds.
  const today = todayIso();
  if (state.data.meta?.activeDate !== today || state.data.meta?.activeWeekStart !== startOfWeekIso(today)) {
    state.data = await window.iterself.mutate({
      type: 'setMeta',
      patch: { activeDate: today, activeWeekStart: startOfWeekIso(today) },
    });
  }

  render();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.data.settings?.theme === 'system') applySettings();
  });
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `<pre>${escapeHtml(error.stack || error.message)}</pre>`;
});
