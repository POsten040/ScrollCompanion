
let form = document.getElementById("domain");
form.addEventListener("submit", function(){
  console.log("form submitted")
})

let onOff = document.getElementById("onButton");
let darkMode = document.getElementById("darkModeButton");
let body = document.getElementById("body");

darkMode.addEventListener("click", function(){
  if(body.className == "lightMode"){
    body.classList.remove("lightMode");
    body.classList.add("darkMode");
  } else {
    body.classList.remove("darkMode");
    body.classList.add("lightMode");
  }
})

onOff.addEventListener("click", function(){
  if(onOff.className == "on"){
    onOff.classList.remove("on");
    onOff.classList.add("off");
  } else {
    onOff.classList.remove("off");
    onOff.classList.add("on");
  }
})
// document.getElementById("modal").addEventListener("click", function() {
//   console.log("submitted!")
// }); 