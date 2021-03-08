let onOffState = {on: false} 
let userInput = {
  minutes: null,
  customMin: null,
  domain: "",
  keywords: "",
  topDomain: "",
  watchMethod: "onNewTab"
}
console.log(chrome.tabs.onCreated)
//Message comes from form button
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(message){
  console.log(message)
  userInput = message;
  if(userInput.minutes === null && userInput.customMin != null){
    userInput.minutes = userInput.customMin;
    console.log(userInput)
  } else if(userInput.minutes === null && userInput.customMin === null){
    userInput.minutes = 1;
    console.log(userInput);
  } else if (userInput.on){
    console.log(userInput)
    onOffState = userInput;
  }
}
// let test = "name";
// chrome.tabs.query({active: false, currentWindow: true}, tabs => {
//   let regEx = new RegExp(test, "g");
//   console.log(regEx);
//   // tabs.map(url => url.match(regEx, gi))
//   console.log(tabs);
// })

let tabId = null;

chrome.tabs.onCreated.addListener(function() {
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(userInput.domain === null){
    } else {
      console.log("watch on new tab")
      chrome.tabs.query({active: false, currentWindow: true}, tabs => {
        tabId = tabs[tabs.length-1].id;
        let url = tabs[tabs.length-1].pendingUrl;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        console.log(domains);
        if(userInput.keywords != ""){
          console.log(userInput.minutes);
          if(domains.includes(userInput.domain) && urlArr.includes(userInput.keywords)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else if (userInput.domain != ""){
          if(domains.includes(userInput.domain)){
            console.log(userInput.domain);
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    }
  }
});

chrome.tabs.onHighlighted.addListener(function() {
  if(userInput.watchMethod === "onChangeTab" && onOffState.on === true){
    
    if(userInput.domain === null){
    } else {
      console.log("watch on change tab")
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        tabId = tabs[0].id;
        let url = tabs[0].url;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        if(userInput.keywords != ""){
          console.log(userInput.keywords);
          if(domains.includes(userInput.domain) && urlArr.includes(userInput.keywords)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else if (userInput.domain != ""){
          if(domains.includes(userInput.domain)){
            console.log(userInput.domains);
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    }
  }
});
//running in the background for matching urls



const options = {
  type: "basic",
  title: "It Is Time",
  message: "To do crime",
  iconUrl: "./images/pixel_waterfall_128.png",
  eventTime: 5000
}

//revceives alarm after timer
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