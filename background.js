
// function Timer(){
//   setTimeout(()=>{
//     alert("This timer went off babe")
//   }, 1000)
// }

// chrome.tabs.onActivated.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//     let url = tabs[0].url;
//     if(url.includes("reddit")){
//       Timer();
//     }
//   });
// }); 
// $('#myModal').modal({ show: false})

let userDomains = [];


// chrome.tabs.onUpdated.addListener(function() {
//   chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    
//     let url = tabs[0].url;
//     let urlArr = url.split('/');
//     let runTimerBoolArr = urlArr.map(e=> e.includes("reddit"));
//     if(runTimerBoolArr.find(e=> e===true)){
//       console.log(tabs[0].id);
//       chrome.tabs.sendMessage(tabs[0].id, "Hello")
      
//     }
//   });
// }); 

chrome.tabs.onHighlighted.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    
    let url = tabs[0].url;
    let urlArr = url.split('/');
    let runTimerBoolArr = urlArr.map(e=> e.includes("reddit"));
    if(runTimerBoolArr.find(e=> e===true)){
      console.log(tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, "Hello")
      
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