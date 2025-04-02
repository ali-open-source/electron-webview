// main.js - Main Electron Process
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require('electron-squirrel-startup')) {
  app.quit();
}

// CRITICAL: Enable WebView integration globally
// This is required for older Electron versions
app.commandLine.appendSwitch('enable-features', 'WebViewTag');

let mainWindow;

// Create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // These settings apply to our main window
      nodeIntegration: true,
      contextIsolation: false,
      // CRITICAL: Enable webview tag with proper Node.js integration
      webviewTag: true,
      webSecurity: true,
      enableRemoteModule: true
    }
  });

  // Load the initial HTML file
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // Open DevTools in the main window for debugging
  mainWindow.webContents.openDevTools();

  // Handle window closed event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create window when Electron is ready
app.whenReady().then(() => {
  // CRITICAL: Set global security preferences for WebView tag
  // This ensures any created WebView tags inherit these preferences
  app.on('web-contents-created', (event, contents) => {
    if (contents.getType() === 'webview') {
      // Enable Node.js integration in WebViews
      contents.on('will-attach-webview', (event, webPreferences, params) => {
        // Enable Node.js integration
        webPreferences.nodeIntegration = true;
        webPreferences.contextIsolation = false;
        webPreferences.enableRemoteModule = true;
        
        // Log for debugging
        console.log('WebView created with Node integration enabled');
      });
    }
  });
  
  createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On OS X it's common for applications to stay active until explicitly quit
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window when dock icon is clicked
  if (mainWindow === null) {
    createWindow();
  }
});