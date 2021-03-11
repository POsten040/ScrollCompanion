function LoadSettings(){
  chrome.storage.sync.get(["stored"], function(result) {
    if(result.stored != undefined){
      console.log(result.stored)
      let message = {
        type: "load",
        result: result.stored
      }
      chrome.runtime.sendMessage(message);
      let data = result.stored;
      $("#savedDomain").html("<li>" + "Domain: " + data.timerSettings.domain + "</li>");
      $("#savedMinutes").html("<li>" +"Minutes: " + data.timerSettings.minutes + "</li>");
      $("#savedKeywords").html("<li>" +"Keywords: " + data.timerSettings.keywords + "</li>");
      $("#savedMethod").html("<li>" +"Watch Method: " + data.timerSettings.watchMethod + "</li>");
    } else {
      $("#errorPopup").addClass("show");
      // chrome.alarms.create("loadPopup", {delayInMinutes: 1})
      // $("#errorPopup").toggleClass("show")
    }
  })
}
// chrome.alarms.onAlarm.addListener(function( alarm ) {
//   console.log("load alarm")
//   if(alarm.name === "loadPopup"){
//     $("#errorPopup").toggleClass("show")
//   }
// })
$("#loadButton").click(function(){
  LoadSettings();
})
$("button.formSubmit").click(function(){
  let formInput = {
    customMin: (parseInt($("#customMin").val())) != NaN ?  1 : $("#customMin").val(),
    minutes: (parseInt($('input:radio[name=minRadioButtons]:checked').val())) != NaN ? null :  $('input:radio[name=minRadioButtons]:checked').val(),
    domain: ($("#domain").val() != "") ? $("#domain").val() : "<all_urls>",
    keywords: ($("#keywords").val() != "") ? $("#keywords").val() : "",
    watchMethod: ($("input:radio[name=watchMethodRadioButtons]:checked").val() != undefined) ? $("input:radio[name=watchMethodRadioButtons]:checked").val() : "onNewTab"
  }
  let notifFormInput = {
    iconUrl: "images/pixel_waterfall_128.png",
    type:"basic",
    title: ($("#title").val() === "") ? "Generic Title" : $("#title").val(),
    message: ($("#message").val() === "") ? "The Time Is Now" : $("#message").val(),
    eventTime: ($("#eventTime").val() === "") ? 5000 : $("#eventTime").val(),
    silent: ($('input:radio[name=silent]:checked').val() != undefined) ? true : false,
    requireInteraction: ($('input:radio[name=interactInput]:checked').val() != undefined) ? true : false
  }
  console.log(formInput)
  console.log(notifFormInput)
  let newTimerMessage = {
    type: "new",
    result: {
    timerSettings: formInput,
    notifSettings: notifFormInput
    }
  }
  chrome.runtime.sendMessage(newTimerMessage);
  if(formInput.domain != ""){
    $("#savedDomain").html("<li>" + "Domain: " + formInput.domain + "</li>");
    $("#savedMinutes").html("<li>" +"Minutes: " + formInput.minutes + "</li>");
    $("#savedKeywords").html("<li>" +"Keywords: " + formInput.keywords + "</li>");
    $("#savedMethod").html("<li>" +"Watch Method: " + formInput.watchMethod + "</li>");
  }
  $("input").val("");
  $("#errorPopup").removeClass("show");
})
$("#clearSettings").click(function(){
  $("input").val("");
  const resetSettings = {
    minutes: null,
    customMin: null,
    domain: "",
    keywords: "",
    topDomain: null,
    onNewTab: false,
    onChangeTab: false
  }
  chrome.runtime.sendMessage(resetSettings);
})
$("#darkModeButton").click(function(){
  $("#holder").toggleClass("darkMode");
  $("#holder").toggleClass("lightMode");
  if($("#darkModeButton").hasClass("off")){
    $("#darkModeButton").toggleClass("off on").text("Light");
    $("div.card-body").toggleClass("card-body-darkMode");
  } else {
    $("#darkModeButton").toggleClass("on off").text("Dark");
    $("div.card-body").toggleClass("card-body-darkMode");
  }
})
$("#onButton").click(function(){
  if($("#onButton").hasClass("off")){
    $("#onButton").toggleClass("off on").text("On");
    chrome.runtime.sendMessage({on:true});
  } else {
    $("#onButton").toggleClass("on off").text("Off");
    chrome.runtime.sendMessage({on:false})
  }
})
$("#interact").click(function(){
  if($("#interact").hasClass("off")){
    $("#interact").toggleClass("off").text("Yes");
    $("#interact").toggleClass("on");
  } else if ($("#interact").hasClass("on")){
    $("#interact").toggleClass("on").text("No");
    $("#interact").toggleClass("off");
  }
})
$("#silent").click(function(){
  if($("#silent").hasClass("off")){
    $("#silent").toggleClass("off").text("Yes");
    $("#silent").toggleClass("on");
  } else if ($("#silent").hasClass("on")){
    $("#silent").toggleClass("on").text("No");
    $("#silent").toggleClass("off");
  }
})
$("#fiveMinInput").click(function(){
  if($("#tenMin").hasClass("on")){
    $("#tenMin").toggleClass("off on");
  }
  if($("#fifteenMin").hasClass("on")){
    $("#fifteenMin").toggleClass("off on");
  }
  if($("#twentyMin").hasClass("on")){
    $("#twentyMin").toggleClass("off on");
  }
  $("#fiveMin").toggleClass("off on");
})
$("#tenMinInput").click(function(){
  if($("#fiveMin").hasClass("on")){
    $("#fiveMin").toggleClass("off on");
  }
  if($("#fifteenMin").hasClass("on")){
    $("#fifteenMin").toggleClass("off on");
  }
  if($("#twentyMin").hasClass("on")){
    $("#twentyMin").toggleClass("off on");
  }
  $("#tenMin").toggleClass("off on");
})
$("#fifteenMinInput").click(function(){
  if($("#tenMin").hasClass("on")){
    $("#tenMin").toggleClass("off on");
  }
  if($("#fiveMin").hasClass("on")){
    $("#fiveMin").toggleClass("off on");
  }
  if($("#twentyMin").hasClass("on")){
    $("#twentyMin").toggleClass("off on");
  }
  $("#fifteenMin").toggleClass("off on");
})
$("#twentyMinInput").click(function(){
  if($("#tenMin").hasClass("on")){
    $("#tenMin").toggleClass("off on");
  }
  if($("#fifteenMin").hasClass("on")){
    $("#fifteenMin").toggleClass("off on");
  }
  if($("#fiveMin").hasClass("on")){
    $("#fiveMin").toggleClass("off on");
  }
  $("#twentyMin").toggleClass("off on");
})
$("#onNewTabButton").click(function(){
  if($("#onChangeLabel").hasClass("on")){
    $("#onChangeLabel").toggleClass("off on");
  }
  $("#newTabLabel").toggleClass("off on");
})
$("#onChangeTabButton").click(function(){
  if($("#newTabLabel").hasClass("on")){
    $("#newTabLabel").toggleClass("off on");
  }
  $("#onChangeLabel").toggleClass("off on");
})
$("#timerSettingCollapse").click(function(){
  if($("#collapseTwo").hasClass("show")){
    $("#collapseTwo").toggleClass("show")
  }
  if(($("#collapseThree").hasClass("show"))){
    $("#collapseThree").toggleClass("show")
  }
  $("#collapseOne").toggleClass("show");
});
$("#notifSettingCollapse").click(function(){
  if($("#collapseOne").hasClass("show")){
    $("#collapseOne").toggleClass("show")
  }
  if(($("#collapseThree").hasClass("show"))){
    $("#collapseThree").toggleClass("show")
  }
  $("#collapseTwo").toggleClass("show");
});
$("#currentTimerCollapse").click(function(){
  if($("#collapseOne").hasClass("show")){
    $("#collapseOne").toggleClass("show")
  }
  if(($("#collapseTwo").hasClass("show"))){
    $("#collapseTwo").toggleClass("show")
  }
  $("#collapseThree").toggleClass("show");
});
$("#genericTimer").click(function(){
  chrome.runtime.sendMessage({type: "generic"})
})


// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 