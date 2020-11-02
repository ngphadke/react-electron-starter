// Import electron
const {app, BrowserWindow} =  require('electron')
const path = require('path')
const url = require('url')

let mainWindow

// Keep a reference for dev mode
let dev = false

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
  dev = true
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1024,
      height: 768,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    })
  
    // and load the index.html of the app.
    let indexPath
  
    if (dev && process.argv.indexOf('--noDevServer') === -1) {
      indexPath = url.format({
        protocol: 'http:',
        host: 'localhost:8080',
        pathname: 'index.html',
        slashes: true
      })
    } else {
      indexPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'dist', 'index.html'),
        slashes: true
      })
    }
  
    mainWindow.loadURL(indexPath)
  
    // Don't show until we are ready and loaded
    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
  
      // Open the DevTools automatically if developing
      if (dev) {
        const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
  
        installExtension(REACT_DEVELOPER_TOOLS)
          .catch(err => console.log('Error loading React DevTools: ', err))
        mainWindow.webContents.openDevTools()
      }
    })
  
    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

//Recreate a window in the app (specifically for MacOS)
app.on('activate', () => {
    if(mainWindow === null){
        createWindow()
    }
})