// main.js
const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const mouseEvents = require('global-mouse-events');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.setPosition(0, 0);
  mainWindow.maximize();
  mainWindow.setIgnoreMouseEvents(true, { forward: true });
  mainWindow.loadFile('index.html');

  // Track mouse clicks and forward to renderer
  mouseEvents.on('mousedown', event => {
    console.log(`[Main] Mouse clicked at: (${event.x}, ${event.y}), Button: ${event.button}`);
    mainWindow.webContents.send('simulate-click', { x: event.x, y: event.y, button: event.button });
  });
}

// Handle logs from renderer
ipcMain.on('log', (event, message) => {
  console.log('[Renderer]', message);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  mouseEvents.pauseMouseEvents();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});