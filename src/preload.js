// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// preload.js - Script to be injected into the WebView
// This runs in the context of the webview before the page loads

// Explicitly expose Node.js functionality to the window object
// This ensures that even if direct nodeIntegration has issues, we have a backup
window.nodeProcess = process;
window.nodeRequire = require;
window.nodeModule = module;
window.nodeBuffer = Buffer;
window.nodeGlobal = global;

// Log to verify preload is working
console.log('Preload script executed in WebView context');
console.log('Node.js version from preload:', process.versions.node);
console.log('Electron version from preload:', process.versions.electron);

// Add a helper function to check if Node integration is working
window.checkNodeIntegration = function() {
    const results = {
        directProcess: typeof process !== 'undefined',
        directRequire: typeof require !== 'undefined',
        windowNodeProcess: typeof window.nodeProcess !== 'undefined',
        windowNodeRequire: typeof window.nodeRequire !== 'undefined',
        versions: process ? process.versions : null
    };
    
    return results;
};