const { app, BrowserWindow, ipcMain, shell } = require('electron')
var WebSocket = require('ws');
const path = require('node:path')
const http = require("http")
const { spawn } = require('child_process');
const host = 'localhost'
const port = '8000'
var webServer;
server = null;
wss = null;
ws2 = null;

const session = {
    'time': null,
    'website': null
}

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
    ipcMain.handle('go-to-create-session', goToCreateSession)
    ipcMain.handle('go-to-session-selection', goToSessionSelection)
    ipcMain.handle('send-session-data', SendSessionData)
    createWindow()
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    });
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

async function noMobileDevice(){
    mainWindow.loadFile('./PAGES/extension-install.html');
    await ServerSetup();
}

async function ServerSetup(){
    server = new http.createServer();
    WebSocketSetUp();
    server.listen(port, () => {
        console.log("Server started on port %s", port);
    });
}

function WebSocketSetUp(){
    console.log("WebSocket being setup");
    wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
    ws2 = ws;
        console.log('WebSocket connected');
        ws.on('message', (message) => {
            console.log('Recieved from extension', message);
            console.log("decode message", message);
            console.log(message.toString());
            if(message.toString() === "FirstMessage"){
                mainWindow.loadFile("./PAGES/Welcome.html");
            }
        });
        ws.send("toServer");
        ws.onclose = function(){
            console.log("Web socket closed, starting new websockets")
            setTimeout(WebSocketSetUp, 1000);
        }
        /*
        ws.on('close', (code, reason) => {
            console.log('WebSocket disconnected. Code:', code, 'Reason:', reason.toString());
            // Additional cleanup or handling logic can be added here
            ws.close();
        });
        */
    });
}

const requestListener = function (req, res) {
    console.log("Message sent")
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200);
    res.end('{"Websites": "youtube.com/, facebook.com/"}');
};

function goToCreateSession(){
    mainWindow.loadFile('./PAGES/createSession.html')
}

function goToSessionSelection(){
    mainWindow.loadFile('./PAGES/sessionSelection.html')
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

function SendSessionData(event, session){
    this.server.getConnections(Connections)
    ws2.send(JSON.stringify(session));
    console.log("Message sent")
    RunAppKiller();
}

function RunAppKiller(){
    const javaAppKiller = spawn('java', ['AppKiller.java', CreateCommandLineList()]);
    console.log("Application Killer started");
}

function CreateCommandLineList(){
    bannedAppsList = "Spotify.exe discord.exe"
    return bannedAppsList;
}

function Connections(err, count){
    console.log(count);
}

