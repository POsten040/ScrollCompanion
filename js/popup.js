
let form = document.getElementById("domain");
form.addEventListener("submit", function(){
  console.log("form submitted")
})

let onOff = document.getElementById("onButton");

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