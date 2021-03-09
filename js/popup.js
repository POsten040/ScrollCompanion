
$("#formSubmit").click(function(){
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
    $("#displayDomains").append("<li>" + formInput.domain + "</li>");
  }
  $("#title").val("");
  $("#message").val("");
  $("#eventTime").val("");
  $("#customMin").val("");
  $("#domain").val("");
  $("#displayDomains").val("");
  $("#keywords").val("");
  $("#topDomain").val("");
})

$("#clearSettings").click(function(){
  $("#domain").val("");
  $("#displayDomains").val("");
  $("#keywords").val("");
  $("#topDomain").val("");
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
    $("#onButton").toggleClass("off").text("On");
    $("#onButton").toggleClass("on");
    chrome.runtime.sendMessage({on:true});
  } else {
    $("#onButton").toggleClass("on").text("Off");
    $("#onButton").toggleClass("off");
    chrome.runtime.sendMessage({on:false})
  }
})
$("#interact").click(function(){
  console.log("click")
  if($("#interact").hasClass("off")){
    console.log("switch")
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
  console.log("click")
  if($("#silent").hasClass("off")){
    console.log("switch")
    $("#silent").toggleClass("off").text("Yes");
    $("#silent").toggleClass("on");
  } else if ($("#silent").hasClass("on")){
    $("#silent").toggleClass("on").text("No");
    $("#silent").toggleClass("off");
  }
})


// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 