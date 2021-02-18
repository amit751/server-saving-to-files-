const sendButton = document.getElementById("send");
const input = document.getElementById("input");
sendButton.addEventListener("click" , onsend);



function onsend(){
    console.log(input.value);
}




let data = {message: "Were gonna ace it!"};
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}
fetch('http://localhost:3000/b',options)
.then((res) => {
    console.log(res);
    res.json()
    .then((data) => {
        console.log(data);
    })
});
