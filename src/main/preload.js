const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('iterself', {
  getData: () => ipcRenderer.invoke('data:get'),
  getAppVersion: () => ipcRenderer.invoke('app:get-version'),
  mutate: (mutation) => ipcRenderer.invoke('data:mutate', mutation),
  replaceData: (data) => ipcRenderer.invoke('data:replace', data),
  chooseExportFolder: () => ipcRenderer.invoke('export:choose-folder'),
  exportBundle: (options) => ipcRenderer.invoke('export:bundle', options),
  openPath: (path) => ipcRenderer.invoke('system:open-path', path),
  createBackup: () => ipcRenderer.invoke('backup:create'),
});
