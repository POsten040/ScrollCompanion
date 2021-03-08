

let formSubmitButton = $("#formSubmit");
formSubmitButton.click(function(){
  let formInput = {
    minutes: parseInt($('input:radio[name=minRadioButtons]:checked').val()),
    customMin: parseInt($("#customMin").val()),
    domain: $("#domain").val(),
    keywords: $("#keywords").val(),
    topDomain: $("#topDomain").val()
  }
  chrome.runtime.sendMessage(formInput)
})

$("#darkModeButton").click(function(){
  $("#holder").toggleClass("darkMode");
  $("#holder").toggleClass("lightMode");
})

$("#onButton").click(function(){
  if($("#onButton").hasClass("off")){
    $("#onButton").toggleClass("off").text("On");
    $("#onButton").toggleClass("on");
  } else {
    $("#onButton").toggleClass("on").text("Off");
    $("#onButton").toggleClass("off");
  }
})
// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 