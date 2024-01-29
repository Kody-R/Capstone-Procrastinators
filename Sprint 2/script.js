var myWorker = new Worker('script.js');

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

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8000');

// Connection opened
socket.onopen = (event) => {
  console.log('WebSocket connection established in Chrome extension');

  // Send a message to the WebSocket server
  socket.send('Hello from Chrome extension!');
};

// Listen for messages
socket.onmessage = (event) => {
  console.log(`Received message in Chrome extension: ${event.data}`);
  for (let i = 0; i < event.data; i++) {
    iParse = JSON.parse(event.data[i]);
    findString(iParse);
    findURL(iParse);
    findAllURL(iParse);
  } 
};