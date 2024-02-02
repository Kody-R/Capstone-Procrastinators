let blockList = new Array();

//BLOCK WORDS
findString = function findText(text) {
  if (typeof window !== "undefined") {
    if(window.find(text)){
      document.documentElement.innerHTML = '';
      document.documentElement.innerHTML = 'This site is blocked';
      document.documentElement.scrollTop = 0;
    }; 
  }
}

//BLOCK THE PARTIAL DOMAINS
findURL = function changeURL(text){
  if (typeof window !== "undefined") {
    var current = window.location.href;
    if(current === text){
      window.location.replace("https://www.google.com");
  }
  }
}

//BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
findAllURL = function changeAllURL(text){
  if (typeof window !== "undefined") {
    var current = window.location.href;
    if(current.startsWith(text)){
      document.documentElement.innerHTML = '';
      document.documentElement.innerHTML = 'Domain is blocked';
      document.documentElement.scrollTop = 0;
    } 
  }
}

chrome.runtime.onInstalled.addListener(function() {
  const socket = new WebSocket("ws://localhost:8000");

  socket.onopen = function(event) {
  console.log("web socket connection opened", event);
  const data = JSON.stringify("hello from chrome extension");
  socket.send(data);
};

socket.onmessage = function(event) {
  console.log("Recieved message from WebSocket server:", event.data);
  blockList.push(event.data); 
  const data = blockList;
  socket.send(data);
};

socket.onclose = function(event) {
  console.log("Websocket server closed", event);
};
});
let BList = blockList.toString();
let blockList2 = BList.split(", "); 
for (let i = 0; i < blockList.length; i++){
  findString(blockList[i]);
  findURL(blockList[i]);
  findAllURL(blockList[i]);
}