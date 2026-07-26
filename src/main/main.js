const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');

const { createStore } = require('./store');
const { createExportBundle } = require('./exporter');

let mainWindow;
let store;

// Keep Chromium session caches in a dedicated subdirectory. Without this,
// Electron may try to migrate an old default cache across locations on
// Windows and log noisy "Unable to move the cache" / GPU cache errors.
app.setPath('sessionData', path.join(app.getPath('userData'), 'session-data'));

// Two instances share one data file and would overwrite each other's writes
// (dev runs and the packaged app share userData too). Second launch focuses
// the existing window instead.
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) app.quit();

app.on('second-instance', () => {
  if (!mainWindow) return;
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.focus();
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1080,
    minHeight: 720,
    title: 'IterSelf',
    icon: path.join(__dirname, '../../build/icon.png'),
    backgroundColor: '#f7f5ef',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(async () => {
  if (!gotSingleInstanceLock) return;
  store = await createStore(app.getPath('userData'));
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('data:get', async () => store.getData());

ipcMain.handle('app:get-version', () => app.getVersion());

ipcMain.handle('data:mutate', async (_event, mutation) => {
  const updated = await store.mutate(mutation);
  return updated;
});

ipcMain.handle('data:replace', async (_event, nextData) => {
  return store.replace(nextData);
});

ipcMain.handle('export:choose-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Choose export folder',
    properties: ['openDirectory', 'createDirectory'],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle('export:bundle', async (_event, options) => {
  const data = await store.getData();
  const targetDir = options?.targetDir;
  if (!targetDir) throw new Error('Missing export target directory.');
  const result = await createExportBundle(data, targetDir, options || {});
  return result;
});

ipcMain.handle('system:open-path', async (_event, targetPath) => {
  if (!targetPath) return false;
  await shell.openPath(targetPath);
  return true;
});

ipcMain.handle('backup:create', async () => {
  const data = await store.getData();
  const backupDir = path.join(app.getPath('userData'), 'backups');
  await fs.mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(backupDir, `iterself-backup-${stamp}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return filePath;
});
