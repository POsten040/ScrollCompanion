
function Timer(){
  setTimeout(()=>{
    alert("This timer went off babe")
  }, 1000)
}

// chrome.tabs.onActivated.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//     let url = tabs[0].url;
//     if(url.includes("reddit")){
//       Timer();
//     }
//   });
// }); 

chrome.tabs.onActivated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let url = tabs[0].url;
    console.log(url)
    let urlArr = url.split('/');
    console.log(urlArr)
    let runTimerBoolArr = urlArr.map(e=> e.includes("reddit"));
    console.log(runTimerBoolArr)
    if(runTimerBoolArr.find(e=> e===true)){
      Timer();
    }
  });
}); 


//SAVE PREFERENCES BETWEEN CHROME RESTART
// To read:

//     var myStoredValue = localStorage["TheKeyToMyStoredValue"];
// // To write:

//     localStorage["TheKeyToMyStoredValue"] = myNewValueToStore;
// // To get rid of:

//     delete localStorage["TheKeyToMyStoredValue"];