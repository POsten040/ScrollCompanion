
function Timer(){
  setTimeout(()=>{
    alert("This timer went off babe")
  }, 1000)
}

chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    if(url.includes("reddit")){
      Timer();
    }
  });
}); 
