

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
    if (typeof window !== 'undefined') {
      console.log("find url");
      var current = window.location.href;
      if(current === text){
        window.location.replace("https://www.google.com");
    }
    }
  }
  
  
  
  //BLOCK THE ENTIRE DOMAIN WITH THE FOLLOWING FUNCTION
  findAllURL = function changeAllURL(text){
    if (typeof window !== 'undefined') {
      console.log("find all url");
      var current = window.location.href;
      if(current.startsWith(text)){
        document.documentElement.innerHTML = '';
        document.documentElement.innerHTML = 'Domain is blocked';
        document.documentElement.scrollTop = 0;
      } 
    }
  }

  let myPort = chrome.runtime.connect({ name: "port-from-cs" });
  myPort.postMessage({ greeting: "hello from content script" });
  
  myPort.onMessage.addListener((m) => {
    console.log("from webpage");
    webBlockList = JSON.parse(m.greeting)
    const parts = webBlockList.split(',');
    if (parts.length > 1) {
      const timerValue = parseInt(parts[0]);
      setTimeout(() => {
        console.log('Timer expired!');
      }, timerValue);
      parts.shift();
    if (webBlockList.length == 0){
      clearTimeout(timeOut);
    };
  }
    for(let i = 0; i < parts.length; i++){
        findString(parts[i]);
        findURL(parts[i]);
        findAllURL(parts[i]);
    }
  });
