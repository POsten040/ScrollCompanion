let onOffState = {on: false} 
console.log(onOffState)
let alarmSet = false;
let tabId = null;
let notifSettings = {};
let userInput = {};
//Message comes from form button
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(message){
  console.log(message)
  if(message.on != undefined){
    onOffState = message;
    console.log(onOffState)
  } else if (message.timerSettings.domain != undefined) {
    userInput = message.timerSettings;
    console.log(userInput)
    if(userInput.minutes === null && userInput.customMin != null){
      userInput.minutes = userInput.customMin;
    } else if(userInput.minutes === null && userInput.customMin === null){
      userInput.minutes = 1;
    }
    notifSettings = message.notifSettings;
    console.log(notifSettings)
  } 
}
chrome.tabs.onCreated.addListener(function() {
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(alarmSet){
      console.log("caught at 29")
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
            alarmSet = true;
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
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
    if(alarmSet){
      console.log("caught line 65")
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        console.log(userInput)
        tabId = tabs[0].id;
        let url = tabs[0].url;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords));
        if(userInput.keywords != ""){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    }
  }
});


//revceives alarm after timer
chrome.alarms.onAlarm.addListener(function( alarm ) {
  chrome.notifications.create('', notifSettings)
  chrome.alarms.clear(alarm.name)
  alarmSet = false;
})


//SAVE PREFERENCES BETWEEN CHROME RESTART
// To read:

//     var myStoredValue = localStorage["TheKeyToMyStoredValue"];
// // To write:

//     localStorage["TheKeyToMyStoredValue"] = myNewValueToStore;
// // To get rid of:

//     delete localStorage["TheKeyToMyStoredValue"];