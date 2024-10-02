const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,  // Segurança moderna, não usar Node.js no renderizador
      contextIsolation: true,  // Melhor prática de segurança
      enableRemoteModule: false, // Desabilitar o módulo remote
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Função para carregar os dados dos livros do arquivo JSON
ipcMain.handle('load-books', () => {
  const booksFilePath = path.join(__dirname, 'books.json');

  let books = [];
  if (fs.existsSync(booksFilePath)) {
    const data = fs.readFileSync(booksFilePath);
    books = JSON.parse(data);
  }

  return books; // Retorna os livros carregados
});


// Função para salvar os dados do livro no arquivo JSON
ipcMain.handle('save-book', (event, book) => {
  const booksFilePath = path.join(__dirname, 'books.json');

  let books = [];
  if (fs.existsSync(booksFilePath)) {
    const data = fs.readFileSync(booksFilePath);
    books = JSON.parse(data);
  }

  books.push(book);

  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));

  return { status: 'success' };
});
