let onOffState = {on: false} 
let alarmSet = false;
let tabId = null;
let notifSettings = {};
let userInput = {};
let savedSettings = null;
LoadSettings();
function SaveSettings(input){
  chrome.storage.sync.set({stored: input}, function() {
    const savedNotif = {
      type: "basic",
      iconUrl: 'images/pixel_waterfall_128.png',
      title: 'Timer has been saved',
      message: "friends don't let friends scroll alone",
      eventTime: 2000
    }
    chrome.notifications.create(savedNotif);
  });
}
function LoadSettings(){
  chrome.storage.sync.get(["stored"], function(result) {
    if(result.stored != undefined){
      console.log(result.stored)
      chrome.runtime.sendMessage(result.stored)
    } else {
      console.log("No Saved Data")
    }
  })
}
//Message comes from form button
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(message){
  // if(message.save === true && userInput != {}){
    
  // }
  if(message.on != undefined){
    onOffState = message;
  } else if (message.timerSettings != undefined) {
    console.log(message);
    SaveSettings(message);
    userInput = message.timerSettings;
    if(userInput.minutes === null && userInput.customMin != null){
      userInput.minutes = userInput.customMin;
    } else if(userInput.minutes === null && userInput.customMin === null){
      userInput.minutes = 1;
    }
    notifSettings = message.notifSettings;
  } 
}
chrome.tabs.onCreated.addListener(function() {
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(alarmSet){
      console.log("alarm already exists, shutting down now.")
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
