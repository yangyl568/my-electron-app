const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// 在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 如果没有窗口打开则打开一个窗口 (macOS)
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})