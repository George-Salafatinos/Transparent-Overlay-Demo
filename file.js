// package.json
{
  "name": "electron-transparent-overlay",
  "version": "1.0.0",
  "main": "src/main.js",
  "scripts": {
    "start": "electron ."
  },
  "dependencies": {
    "electron": "^28.1.0"
  }
}

// src/main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Make the window click-through except for the button
  win.setIgnoreMouseEvents(true, { forward: true });

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  handleMouseEvent: (callback) => {
    ipcRenderer.on('mouse-event', callback);
  }
});

// src/index.html
<!DOCTYPE html>
<html>
<head>
  <title>Transparent Overlay</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      overflow: hidden;
    }

    #overlay-button {
      position: absolute;
      top: 20px;
      left: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }

    /* Make the entire window transparent except for the button */
    body > *:not(#overlay-button) {
      pointer-events: none;
    }
  </style>
</head>
<body>
  <button id="overlay-button">Click Me</button>
  <script src="renderer.js"></script>
</body>
</html>

// src/renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('overlay-button');
  let isGreen = true;

  // Toggle button color on click
  button.addEventListener('click', (e) => {
    isGreen = !isGreen;
    button.style.backgroundColor = isGreen ? '#4CAF50' : '#f44336';
    e.stopPropagation();
  });

  // Handle click-through functionality
  document.addEventListener('click', (e) => {
    if (e.target !== button) {
      // Get click coordinates
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      // Forward the click event
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: clickX,
        clientY: clickY
      });
      
      document.elementFromPoint(clickX, clickY)?.dispatchEvent(clickEvent);
    }
  });
});