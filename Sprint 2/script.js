let blockList = new Array();
socket = null;

chrome.runtime.onInstalled.addListener(function() {
  InitializeWebSocket();
  setInterval(() => {
    if (socket && socket.readyState !== WebSocket.OPEN) {
      // WebSocket connection is not open, try to reconnect
      console.log("Attempting to reconnect to WebSocket server");
      InitializeWebSocket();
    }
  }, 5000);
});


function InitializeWebSocket(){
  try{
    console.log("Init websocket from extension");
    socket = new WebSocket("ws://localhost:8000");
  
    socket.onopen = function(event) {
    console.log("web socket connection opened", event);
    const data = JSON.stringify("hello from chrome extension");
    socket.send(data);
  };
  
  socket.onmessage = function(event) {
    console.log("Recieved message from WebSocket server:", event.data);
    blockList = event.data.toString()
    console.log(blockList);
    socket.send(blockList);
  };
  
  socket.onclose = function(event) {
    InitializeWebSocket();
  };
  chrome.runtime.onConnect.addListener(connected);
  } catch(error){
    console.error("No extension to connect to", error.message);
  }
};




let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({ greeting: blockList });
  portFromCS.onMessage.addListener((m) => {
    console.log("In background script, received message from content script");
    console.log(m.greeting);
  });
}









