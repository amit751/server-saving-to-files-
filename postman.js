const { Console } = require("console");
const { request } = require("express");
const express = require (`express`);
const app = express();

app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());



const fs = require("fs");

// ToDo =  "DELETE", "POST" , "PUT", "GET ALL", "GET ID"
// 400 = invalid syntax - bad request.
// 401 = the client has to authenticate itself first.
// 402 = payment required, ( very rare)
// 403 = the client has no access rights to the server.

// 308 = the location transfered and no longer in this address.


// BUGS
// -post request with "



// create a new file with the content of req.body
app.post("/b", (request, response) => {
  console.log(app);
  try {
    const { body } = request;
    // CHECKING FOR ERRORS
    // REQUIREMENT: headers = {'content-type': 'application/json'}
    if (!('content-type' in request.headers && request.headers['content-type'] === 'application/json')) {
      throw ({status: 400, message: 'Bad Request - Expected Content-Type to be application/json'});
      // REQUIREMENT: body not empty
    } else if (JSON.stringify(body) === JSON.stringify({})) {
        throw ({status: 400, message: 'Bad Request - Bin cannot be blank'});
    }

     console.log(request.body);
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
  } catch(e) {
    if(typeof(e) === 'object' && e !== null) {
      response.status(e.status).send(e.message);
    } else {
      response.status(500).send(e);
    }
  }
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