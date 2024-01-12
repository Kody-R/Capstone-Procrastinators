const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let mainWindow
let code = [];
let correctCode = [1,2,3,4]
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('./PAGES/index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('to-mobile', toMobile)
    ipcMain.handle('has-mobile-device', hasMobileDevice)
    ipcMain.handle('no-mobile-device', noMobileDevice)
    ipcMain.handle('input-value', getInput)
    createWindow()
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})

//Callback functions for when button events are fired
function toMobile(){
    mainWindow.loadFile("./PAGES/mobileDeviceSelect.html")
}

function hasMobileDevice(){
    mainWindow.loadFile('./PAGES/hasMobileDevice.html')
}

function noMobileDevice(){
    mainWindow.loadFile('./PAGES/extension-install.html')
}


function getInput(event, value){
    console.log("input")
    code.push(value)
    if(code.length == 4){
        if(CorrectCode(code)){
            mainWindow.loadFile('./PAGES/extension-install.html')
        }
        else{
            mainWindow.loadFile('./PAGES/hasMobileDevice.html')
            code = []
        }
    }
}

function CorrectCode(inputCode){
    for(number = 0; number < inputCode.length; number++){
        if(inputCode[number] != correctCode[number]){
            return false;
        }
    }
    return true;
}

