
let form = document.getElementById("domain");
form.addEventListener("submit", function(){
  console.log("form submitted")
})

let onOff = document.getElementById("onButton");
let darkMode = document.getElementById("darkModeButton");
let holder = document.getElementById("holder");

darkMode.addEventListener("click", function(){
  if(holder.className == "lightMode"){
    holder.classList.remove("lightMode");
    holder.classList.add("darkMode");
  } else {
    holder.classList.remove("darkMode");
    holder.classList.add("lightMode");
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