

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
    webBlockList = m.greeting
    var timer = int;
    const timeOut = setTimeout(() => {
    webBlockList.length = 0;
    },timer);
    if (webBlockList.length == 0){
      clearTimeout(timeOut);
    };
    for(let i = 0; i < webBlockList.length; i++){
        findString(webBlockList[i]);
        findURL(webBlockList[i]);
        findAllURL(webBlockList[i]);
    }
  });
