let onOffState = {on: false} 
let alarmSet = false;
let tabId = null;
let notifSettings = {};
let userInput = {};

function SaveSettings(input){
  let savedNotif = {
    type: "basic",
    iconUrl: 'images/pixel_waterfall_128.png',
    title: 'Timer Loaded',
    message: "friends don't let friends scroll alone",
    eventTime: 2000,
    silent: true
  }
  if(input.type === "load"){
    savedNotif.title = "Timer Loaded from Local Storage";
  } else {
    savedNotif.title = "Timer Settings saved";
    input = input.result;
    chrome.storage.sync.set({stored: input}, function() {
    });
  }
  chrome.notifications.create(savedNotif);
}
//Message comes from form button
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(message){
  if(message.on != undefined){
    onOffState = message;
  } else if(message.type === "generic"){
    console.log("generic timer")
    let genericNotif = {
      type: "basic",
      iconUrl: 'images/pixel_waterfall_128.png',
      title: 'Timer Set For 1 Minute',
      message: "friends don't let friends scroll alone",
      eventTime: 2000,
      silent: true
    }
    chrome.alarms.create('genericAlarm', {delayInMinutes: 1})
    chrome.notifications.create(genericNotif);
  } else if (message.result.timerSettings != undefined) {
    SaveSettings(message);
    userInput = message.result.timerSettings;
    if(userInput.minutes === null && userInput.customMin != null){
      userInput.minutes = userInput.customMin;
    }
    notifSettings = message.result.notifSettings;
  } 
  console.log(userInput)
  console.log(notifSettings)
}
chrome.tabs.onCreated.addListener(function() {
  console.log(userInput);
  console.log(notifSettings);
  if(userInput.watchMethod === "onNewTab" && onOffState.on === true){
    if(alarmSet === true){
      console.log("Hold it citizen, an alarm already exists")
    } else if (userInput.domain === "<all_urls>"){
      console.log("all urls alarm started")
      chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
      alarmSet = true;
    } else if (userInput != {}){
      chrome.tabs.query({active: false, currentWindow: true}, tabs => {
        console.log(tabs)
        console.log("userInput != {}")
        tabId = tabs[tabs.length-1].id;
        let url = tabs[tabs.length-1].pendingUrl;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords))
        if(userInput.keywords != "" && userInput.keywords != undefined && matchingDomain != undefined){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
            console.log("alarm set")
          }
        } else if (userInput.domain != "" && matchingDomain != undefined){ 
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
  } else {
    console.log("No Settings Present")
  }
});


chrome.tabs.onHighlighted.addListener(function() {
  console.log(userInput);
  if(userInput.watchMethod === "onChangeTab" && onOffState.on === true){
    if(alarmSet === true){
      console.log("Hold it citizen, an alarm already exists")
    } else if (userInput.domain === "<all_urls>"){
      console.log("all urls alarm started")
      chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
      alarmSet = true;
    } else if(userInput != {}){
      console.log("current window query")
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        console.log(userInput)
        tabId = tabs[0].id;
        let url = tabs[0].url;
        let urlArr = url.split('/');
        let domains = urlArr.splice(0, 3);
        let matchingDomain = domains.find(e=> e.includes(userInput.domain));
        let matchingKeyword = urlArr.find(e=> e.includes(userInput.keywords));
        if(userInput.keywords != "" && userInput.keywords != undefined && matchingDomain != undefined){
          if(matchingKeyword.includes(userInput.keywords) && matchingDomain.includes(userInput.domain)){
            chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
            alarmSet = true;
            console.log("alarm set")
          }
        } else if (userInput.domain != "" && matchingDomain != undefined){ 
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
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
  let genericNotif = {
    type: "basic",
    iconUrl: 'images/pixel_waterfall_128.png',
    title: 'Timer Set For 1 Minute',
    message: "friends don't let friends scroll alone",
    eventTime: 2000,
    silent: true
  }
  chrome.alarms.create('genericAlarm', {delayInMinutes: 1})
  chrome.notifications.create(genericNotif);
});

//revceives alarm after timer
chrome.alarms.onAlarm.addListener(function( alarm ) {
  let genericNotifSettings = null;
  if(alarm.name === "genericAlarm"){
    genericNotifSettings = {
      type: "basic",
      iconUrl: "images/pixel_waterfall_128.png",
      title: "The Fuzz!",
      message: "Better Cheese It!",
      eventTime: 5000,
      silent: false,
      requireInteraction: false
    }
  }
  if(genericNotifSettings != null){
    chrome.notifications.create('', genericNotifSettings)
    chrome.alarms.clear(alarm.name)
    alarmSet = false;
    tabId=null;
  } else {
    console.log(notifSettings)
    chrome.notifications.create('', notifSettings)
    chrome.alarms.clear(alarm.name)
    alarmSet = false;
    tabId=null;
  }
})
