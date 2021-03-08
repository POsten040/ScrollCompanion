
$("#formSubmit").click(function(){
  let formInput = {
    minutes: parseInt($('input:radio[name=minRadioButtons]:checked').val()),
    customMin: parseInt($("#customMin").val()),
    domain: $("#domain").val(),
    keywords: $("#keywords").val(),
    topDomain: $("#topDomain").val(),
    onNewTab: $("#onNewTabButton").val(),
    onChangeTab: $("#onChangeTabButton").val()
  }
  chrome.runtime.sendMessage(formInput);
  $("#displayDomains").append("<li>" + formInput.domain + "</li>");
  $("#domain").text("");
})

$("#clearSettings").click(function(){
  $("#domain").text("");
  $("#displayDomains").text("");
  $("#keywords").text("");
  $("#topDomain").text("");
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

// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 