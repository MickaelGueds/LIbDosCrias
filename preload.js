const { contextBridge, ipcRenderer } = require('electron');

// Expor APIs seguras para o renderizador
contextBridge.exposeInMainWorld('electronAPI', {
    saveBook: (book) => ipcRenderer.invoke('save-book', book),
    loadBooks: (callback) => ipcRenderer.invoke('load-books').then(callback)
});
