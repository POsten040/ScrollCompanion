
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
let tabId = null;

chrome.tabs.onHighlighted.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    tabId = tabs[0].id;
    let url = tabs[0].url;
    let urlArr = url.split('/');
    let runTimerBoolArr = urlArr.map(e=> e.includes(""));
    if(runTimerBoolArr.find(e=> e===true)){
      // console.log(tabs[0].id);
      
      chrome.alarms.create("userAlarm", {delayInMinutes: 1, periodInMinutes: 1});
    }
  });
}); 

const options = {
  type: "basic",
  title: "It Is Time",
  message: "To do crime",
  iconUrl: "./images/pixel_waterfall_128.png",
  eventTime: 5000
}

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log(tabId)
  chrome.notifications.create('', options)
  // chrome.tabs.sendMessage(tabId, "timerFinish")
  chrome.alarms.clear(alarm.name)
})


//SAVE PREFERENCES BETWEEN CHROME RESTART
// To read:

//     var myStoredValue = localStorage["TheKeyToMyStoredValue"];
// // To write:

//     localStorage["TheKeyToMyStoredValue"] = myNewValueToStore;
// // To get rid of:

//     delete localStorage["TheKeyToMyStoredValue"];