const sendButton = document.getElementById("send");
const input = document.getElementById("input");
sendButton.addEventListener("click" , onsend);


function onsend(){
    console.log(input.value);
}


const express = require (`express`);
const app = express();
app.listen(3000 , ()=> { console.log("lissning at 3000")} );
console.log("ffff");