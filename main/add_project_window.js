const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload_window.js'),
    }
  })
  win.loadFile('window.html')
  //win.loadFile('window.html', {query: {"data": JSON.stringify(data)}})
  win.webContents.openDevTools();
  console.log(path.join(__dirname, 'preload_window.js'))
  console.log(win)
  console.log(win.data)
}
/*
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
*/
  module.exports = {createWindow};
