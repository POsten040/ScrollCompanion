chrome.runtime.onMessage.addListener(onUrlMatch)

function onUrlMatch(message, sender, sendResponse){
  console.log(message);
  console.log(sender);
  console.log(sendResponse);
  chrome.alarms.create("userAlarm", {delayInMinutes: .1, periodInMinutes: .1});
}

chrome.alarms.onAlarm.addListener(function( alarm ) {
  console.log("Got an alarm!", alarm);
  // document.getElementById('modal').modal('show');
});