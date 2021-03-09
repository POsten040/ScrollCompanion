let onOffState = {on: false} 
let userInput = {
  minutes: null,
  customMin: null,
  domain: "",
  urlCaptures: [],
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
  } else if(userInput.minutes === null && userInput.customMin === null){
    userInput.minutes = 1;
  } else if (userInput.on){
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
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords))
        if(userInput.keywords != ""){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
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
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        console.log(tabs)
        tabId = tabs[0].id;
        let url = tabs[0].url;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords))
        if(userInput.keywords != ""){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    }
  }
});
let userNotification = {
  type: null,
  title: null,
  message: null, 
  iconUrl: null,
  eventTime: null,
  message: null,
  priority: null,
  silent: null,
  requireInteraction: null,
}
chrome.runtime.onMessage.addListener(OnNotificationSettings)
function OnNotificationSettings(message){
  userNotifcation = message;
}
let options = {
  type: "basic",
  title: "It Is Time",
  message: "To do crime",
  iconUrl: "./images/pixel_waterfall_128.png",
  eventTime: 5000
}

//revceives alarm after timer
chrome.alarms.onAlarm.addListener(function( alarm ) {
  chrome.notifications.create('', options)
  chrome.alarms.clear(alarm.name)
})


//SAVE PREFERENCES BETWEEN CHROME RESTART
// To read:

//     var myStoredValue = localStorage["TheKeyToMyStoredValue"];
// // To write:

//     localStorage["TheKeyToMyStoredValue"] = myNewValueToStore;
// // To get rid of:

//     delete localStorage["TheKeyToMyStoredValue"];