const { Console } = require("console");
const { request } = require("express");
const express = require (`express`);
const app = express();

app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());
const fs = require("fs");

// ToDo =  "DELETE".
// Done =  "POST" , "PUT", "GET ALL", "GET ID".



// create a new file with the content of req.body
app.post("/b", (request, response) => {
  const { body } = request;
  let counterObj = JSON.parse(fs.readFileSync('./db/counter.json',{encoding:'utf8', flag:'r'}));
  counterObj["id"] +=  1 ;
  const counter = counterObj["id"];

  fs.writeFileSync('./db/counter.json',JSON.stringify(counterObj, null, 4));
  fs.writeFileSync(`./db/bins/bin-${counter}.json`,JSON.stringify(body, null, 4));
  
  response.status(200).send({
    "record": counterObj ,
    "metadata": {
      "id": counter,
      "createdAt": new Date(),
    }
  });
});


app.put("/b/:id", (request, response) => {
  const { id } = request.params;
  const { body } = request;
  fs.writeFileSync(`./db/bins/bin-${id}.json`,JSON.stringify(body, null, 4));
  response.status(200).send({
  "record": true ,
  "metadata": {
  "id": id,
  "createdAt": new Date(),
  }
});
});


app.get("/b", (request, response) => {
  const allBinsName = fs.readdirSync( "./db/bins");
  const binsContent = [];
  allBinsName.forEach((binName) => {
    binsContent.push(JSON.parse(fs.readFileSync(`./db/bins/${binName}`,{encoding:'utf8', flag:'r'})));
  });
  response.status(200).send(
    {
  "record": binsContent ,
  "metadata": {
  "id": "all bin",
  "createdAt": new Date(),
  }
});
}); 


app.get("/b/:id" , (request,response) => {
  const { id } = request.params;
  const bin = JSON.parse(fs.readFileSync(`./db/bins/bin-${id}.json`,{encoding:'utf8', flag:'r'}));
  console.log(bin);
  response.status(200).send(
    {
      "record": bin,
      "metadata": {
      "id": id,
      "createdAt": new Date(),
      }
  });
  
});

app.delete("/b/:id" , (request , response) => {
  const { id } = request.params;
  fs.unlinkSync(`./db/bins/bin-${id}.json`);
  response.status(200).send(
    {
      "record": true,
      "metadata": {
      "id": id,
      "createdAt": new Date(),
      }
  });
});