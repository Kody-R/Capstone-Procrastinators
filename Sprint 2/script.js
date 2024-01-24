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

for (let i = 0; i < data.length; i++) {
  iParse = json.Parse(data[i]);
  findString(iParse);
  findURL(iParse);
  findAllURL(iParse);
} 
