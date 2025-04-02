// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

console.log('Preload script loaded');
// Ensure Node.js integration works properly
window.nodeProcess = process;
window.nodeRequire = require;


console.log('Preload script executed, Node integration enabled', process.versions);