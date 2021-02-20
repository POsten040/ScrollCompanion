function Timer(){
  setTimeout(()=>{
    alert("This timer went off babe")
  }, 1000)
}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  let url = tabs[0].url;
  if(url.includes("reddit")){
    console.log(url)
  }
});



console.log("this is the content script firing boii");


// chrome.runtime.sendMessage({greeting: "hello"});

// chrome.getElementById("timer").onclick(console.log("clicked"));