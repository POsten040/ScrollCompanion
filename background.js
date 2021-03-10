let onOffState = {on: false} 
let alarmSet = false;
let tabId = null;
let notifSettings = {};
let userInput = {};
// let savedSettings = null;

function SaveSettings(input){
  chrome.storage.sync.set({stored: input}, function() {
    const savedNotif = {
      type: "basic",
      iconUrl: 'images/pixel_waterfall_128.png',
      title: 'Timer has been saved',
      message: "friends don't let friends scroll alone",
      eventTime: 2000,
      silent: true
    }
    chrome.notifications.create(savedNotif);
  });
}
// function LoadSettings(){
//   chrome.storage.sync.get(["stored"], function(result) {
//     if(result.stored != undefined){
//       console.log(result.stored)
//       chrome.runtime.sendMessage(result.stored)
//     } else {
//       console.log("No Saved Data")
//     }
//   })
// }
//Message comes from form button
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(message){
  // if(message.save === true && userInput != {}){
    
  // }
  if(message.on != undefined){
    onOffState = message;
  } else if (message.timerSettings != undefined) {
    console.log("saved");
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
  console.log(onOffState);
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(alarmSet == true){
      console.log("Hold it citizen, an alarm already exists")
    } else if (userInput.domain === "<all_urls>"){
      chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
      alarmSet = true;
    } else if (userInput != {}){
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
            console.log("alarm set")
          }
        } else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
            console.log("alarm set")
          }
        } else {
          console.log("No Alarm Parameters Present")
        }
      })
    } else {
      console.log("alarm already set")
    }
  }
});

chrome.tabs.onHighlighted.addListener(function() {
  if(userInput.watchMethod === "onChangeTab" && onOffState.on === true){
    if(alarmSet == true){
      console.log("Hold it citizen, an alarm already exists")
    } else if(userInput != {}){
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
            console.log("alarm set")
          }
        } else if(userInput.domain === "<all_urls>") {
          console.log("alaaaaaarms")
        }else if (userInput.domain != ""){ 
          if(matchingDomain.includes(userInput.domain)){
            console.log("timer created");
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
            console.log("alarm set")
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
