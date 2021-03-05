chrome.runtime.onMessage.addListener(onUrlMatch);

function onUrlMatch(message, sender, sendResponse){
  
  // console.log(message);
  console.log("Got an alarm!");
  console.log(message);
  console.log(sendResponse);
  console.log(sender);
}



  // 
  // document.getElementById('modal').modal('show');


