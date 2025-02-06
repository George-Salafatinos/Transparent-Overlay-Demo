// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onSimulateClick: (callback) => {
    ipcRenderer.on('simulate-click', (event, pos) => callback(pos));
  },
  log: (message) => {
    ipcRenderer.send('log', message);
  }
});