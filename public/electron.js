const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

// require("update-electron-app")({
//   repo: "vucadev/forbex-contact-desktop",
//   updateInterval: "1 hour"
// });

/**
 * Creación de la ventana de la app
*/
function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 900,
    height: 680,
    webPreferences: { nodeIntegration: true },
  })
  mainWindow.loadURL(
    isDev ?
      'http://localhost:3000' :
      `file://${path.join(__dirname, '../build/index.html')}`,
  )
  mainWindow.maximize()
  mainWindow.show()

  mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
