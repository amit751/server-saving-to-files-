const { Console } = require("console");
const express = require (`express`);
const app = express();

app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());
const fs = require("fs");





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


app.put("/api/:id", (request, response) => {
  const { id } = request.params;
  const { body } = request;
 
  let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
  objs = JSON.parse(objs);
  console.log(objs);
  for (let i =0; i< objs["todos"].length ; i++) {
    console.log(objs["todos"][i]["id"]);
    console.log(objs["todos"][i]);
    if(objs["todos"][i]["id"].toString() === id){
      objs["todos"][i] = body;///////////////wrong
       console.log(1);
    }
  }
  
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify( objs, null, 4)
  );
  
  
  
  response.send(body);
  
});





app.put("/api", (request, response) => {
  
  const { body } = request;
  const { id } = request.params;
 
    
  console.log(body);
  
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify(body, null, 4)
  );

  response.send(JSON.stringify(body));
  
});


app.delete("/api/:id", (request, response) => {
  const { id } = request.params;
  let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
  objs = JSON.parse(objs);
  for (let i =0; i< objs["todos"].length ; i++) {
    console.log(objs["todos"][i]["id"]);
    console.log(objs["todos"][i]);
    if(Number(objs["todos"][i]["id"]) === Number(id)){
       delete objs["todos"][i] ;///////////////wrong
       console.log(100);
    }
  }
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify( objs, null, 4)
  );
  
  
  
  response.send(objs);

});



app.get("/api", (request, response) => {
  let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
  response.send(objs);
});

app.get("/api/:id", (request, response) => {
  const { id } = request.params;
  let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
  objs = JSON.parse(objs);
  let data;
  for (const obj of objs.todos) {
    if(obj.id === Number(id)){
       data = JSON.stringify(obj);
    }
  }
  response.send(data);
});
