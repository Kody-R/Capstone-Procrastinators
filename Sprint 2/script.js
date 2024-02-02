let blockList = new Array();


chrome.runtime.onInstalled.addListener(function() {
  try{
    const socket = new WebSocket("ws://localhost:8000");
  
    socket.onopen = function(event) {
    console.log("web socket connection opened", event);
    const data = JSON.stringify("hello from chrome extension");
    socket.send(data);
  };
  
  socket.onmessage = function(event) {
    console.log("Recieved message from WebSocket server:", event.data);
    blockList = event.data.split(", ");
    console.log(blockList);
    socket.send(blockList);
    chrome.runtime.onConnect.addListener(connected);
  };
  
  socket.onclose = function(event) {
    console.log("Websocket server closed", event);
  };
  } catch(error){
    console.error("No extension to connect to", error.message);
  }
});


let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({ greeting: blockList });
  portFromCS.onMessage.addListener((m) => {
    console.log("In background script, received message from content script");
    console.log(m.greeting);
  });
}