
chrome.runtime.onMessage.addListener(onAlarm);

$("body").append('<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>')

function onAlarm(message, sender, sendResponse){
  swal('timer went off')
  console.log("Got an alarm!");
}

