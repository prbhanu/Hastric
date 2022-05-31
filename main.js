const {app , BrowserWindow, ipcMain , Tray , Menu, Notification} = require("electron")
const path = require("path")
const rpc = require('discord-rpc');
const startTimestamp = new Date();
const TrayNotif = 'Hastric is still running in background. To close go to the tray.'
const trayNotifTitle = 'Hastric'

let win;
let tray = null
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height:400,
        titleBarOverlay: {
            color: '#121212',
            symbolColor: '#74b1be'
          },
        icon: path.join(__dirname, 'HastricLogo.png'),
        webPreferences:{
            preload: path.join(__dirname ,'preload.js')
        }
    })
    win.setMenuBarVisibility(false)
    win.loadFile('index.html')
    win.setBackgroundColor("#121212")
    win.removeMenu();
    win.on('close', function (event) {
        if(!app.isQuiting){
            event.preventDefault();
            win.hide();
            notification()
        }
    
        return false;
    });
}
app.setName("Hastric")
app.on("ready" , ()=>{
    createWindow()
    tray = new Tray("./HastricLogo.png")
    tray.setToolTip('Hastric')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit' , click(){
            win.destroy()
            app.quit()
        }},
        { label: 'Show' , click(){
            win.show()
        } }
      ])
      tray.setContextMenu(contextMenu)
    })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })


function notification(){
    new Notification({
        title: trayNotifTitle,
        body: TrayNotif
    }).show()
}


