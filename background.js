
let userInput = {
  minutes: null,
  customMin: null,
  domain: null,
  keywords: null,
  topDomain: null
}
chrome.runtime.onMessage.addListener(onUserInput);
function onUserInput(formMessage){
  console.log(formMessage)
  userInput = formMessage;
  if(userInput.minutes == null && userInput.customMin != null){
    userInput.minutes = userInput.customMin;
    console.log(userInput)
  } else if(userInput.customMin == null){
    userInput.minutes = 1;
    console.log(userInput);
  }
}

let tabId = null;

chrome.tabs.onHighlighted.addListener(function() {
  if(userInput.domain === null){
    console.log("Scroll Alone")
  } else {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      tabId = tabs[0].id;
      let url = tabs[0].url;
      let urlArr = url.split('/');
      let domains = urlArr.splice(0, 3);
      if(userInput.keywords != null){
        console.log(userInput.minutes);
        if(domains.includes(userInput.domain) && urlArr.includes(userInput.keywords)){
          // console.log(tabs[0].id);
          chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          console.log(chrome.alarms.get(userAlarm))
        }
      } else if (userInput.domain != null){
        if(domains.includes(userInput.domain)){
          console.log(userInput.domains);
          chrome.alarms.create("userAlarm", {delayInMinutes: userInput.minutes});
          console.log(chrome.alarms.get(userAlarm))
        }
      } else {
        console.log("No Alarm Parameters Present")
      }
    });
  }
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