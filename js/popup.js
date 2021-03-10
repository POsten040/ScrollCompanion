
// $("#saveTimer").click(function(){
//   console.log("clicked");
//   chrome.runtime.sendMessage({save: true});
// })
$("button.formSubmit").click(function(){
  let formInput = {
    minutes: parseInt(($('input:radio[name=minRadioButtons]:checked').val() != null ? $('input:radio[name=minRadioButtons]:checked').val() : $("#customMin").val())),
    customMin: parseInt(($("#customMin").val() != null) ? $("#customMin").val() : 1),
    domain: ($("#domain").val() != "") ? $("#domain").val() : "<all_urls>",
    keywords: ($("#keywords").val() != "") ? $("#keywords").val() : "",
    // topDomain: $("#topDomain").val(),
    watchMethod: ($("input:radio[name=watchMethodRadioButtons]:checked").val() != undefined) ? $("input:radio[name=watchMethodRadioButtons]:checked").val() : "onNewTab",
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
  let userSettings = {
    timerSettings: formInput,
    notifSettings: notifFormInput
  }
  chrome.runtime.sendMessage(userSettings);
  if(formInput.domain != ""){
    $("#savedDomain").html("<li>" + "Watching For: " + formInput.domain + "</li>");
    $("#timerLength").html("<li>" +"Timer For: " + formInput.minutes + "</li>");
  }
  $("input").val("");
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
    $("#darkModeButton").toggleClass("off").text("Light Mode");
    $("#darkModeButton").toggleClass("on");
  } else {
    $("#darkModeButton").toggleClass("on").text("Dark Mode");
    $("#darkModeButton").toggleClass("off");
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
// $("#interactButton").click(function(){
//   console.log("input")
// })
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


// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 