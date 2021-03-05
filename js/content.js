chrome.runtime.onMessage.addListener(onUrlMatch)

function onUrlMatch(message, sender, sendResponse){
  chrome.alarms.create("userAlarm", {delayInMinutes: .1, periodInMinutes: .1});
  // console.log(message);
  console.log("Got an alarm!");
  console.log(message);
  // console.log(sendResponse);
}

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log('alarm', alarm)
  // 
  })
  // document.getElementById('modal').modal('show');


