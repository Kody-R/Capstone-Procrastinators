const { app, BrowserWindow, ipcMain, shell } = require('electron')
var WebSocket = require('websocket').server
const path = require('node:path')
const http = require("http")
const host = 'localhost'
const port = '8000'
var webServer;

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
    ipcMain.handle('extension-install', installExtension)
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

function installExtension(){
    shell.openExternal("https://chromewebstore.google.com/detail/capstone/eimfgfgjliejkfofljnpbdfijgaimdaf")
}

function hasMobileDevice(){
    mainWindow.loadFile('./PAGES/hasMobileDevice.html')
}

function noMobileDevice(){
    mainWindow.loadFile('./PAGES/extension-install.html')
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log('server is running on http://' + host + ":" + port);
    });
    webServer = new WebSocket({
        httpServer: server,
        autoAcceptConnections: true
    });
    webServer.on('request', function(request){
        var connection = request.accept('echo-protocol', request.origin);
        connection.on('message', function(message){
            if(message.type === 'utf8'){
                connection.sendUTF(message.utf8Data)
            }
        });
        connection.on('close', function(reasonCode, description){
            console.log("connection closed")
        });
    })
}

const requestListener = function (req, res) {
    console.log("Message sent")
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200);
    res.end('{"Websites": "Youtube.com/, Facebook.com/"}');
};



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

