const sendButton = document.getElementById("send");
const input = document.getElementById("input");
sendButton.addEventListener("click" , onsend);


function onsend(){
    console.log(input.value);
}