const express = require (`express`);
const app = express();
app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());
const fs = require("fs");
let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
objs = JSON.parse(objs);
// console.log(objs);
// let todos = objs["todos"];
// console.log(todos);
// console.log(todos.length);
const data = {first: 0};
objs.todos.push(data);

// fs.appendFileSync('./db/all-objs.json', 
// JSON.stringify(objs), 
//   { encoding: "utf8", flag: "w" } 
// ); 

fs.writeFileSync(
  './db/all-objs.json',
  JSON.stringify(objs, null, 4)
);
/////nitzan:


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

app.post("/api", (request, response) => {
  const { body } = request;
  console.log(body);
  let objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});
  objs = JSON.parse(objs);
  let newObj =body;
  let todos = objs["todos"];
  console.log(todos);
  console.log(todos.length);
  newObj["id"]=todos.length;
  objs["todos"].push(newObj);
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify(objs, null, 4)
  );

  response.send(newObj);
  
  

  
  // try {
  //   fs.writeFileSync(
  //     `./db/object-${id}.json`,
  //     JSON.stringify(body, null, 4)
  //   );
  //   fs.writeFileSync(
  //     `./db/object-${id}.json`,
  //     JSON.stringify(body, null, 4)
  //   );
  //   response.status(201).send("greet added");
  // } catch (e) {
  //   response.status(500).json({ message: "Error!", error: e });
  // }
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
    if(objs["todos"][i] === id){
      objs["todos"][i] = 12;///////////////wrong
       console.log(objs["todos"][i]);
    }
  }
  
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify( objs, null, 4)
  );
  
  
  
  response.send(body);
  
  
  // try {
  //   fs.writeFileSync(
  //     `./greets/greet-${created}.json`,
  //     JSON.stringify(body, null, 4)
  //   );
  //   response.json(body);
  // } catch (e) {
  //   response.status(500).json({ message: "Error!", error: e });
  // }
});





app.put("/api", (request, response) => {
  
  const { body } = request;
 
    
  console.log(body);
  
  fs.writeFileSync(
    './db/all-objs.json',
    JSON.stringify(body, null, 4)
  );

  response.send(JSON.stringify(body));
  
  
  // try {
  //   fs.writeFileSync(
  //     `./greets/greet-${created}.json`,
  //     JSON.stringify(body, null, 4)
  //   );
  //   response.json(body);
  // } catch (e) {
  //   response.status(500).json({ message: "Error!", error: e });
  // }
});





// app.post("/api", (request, response) => {
//   const { body } = request;
//   const objs = fs.readFileSync('.db/all-objs.json',{encoding:'utf8', flag:'r'});
//   objs = JSON.parse(objs);
  
//   try {
//     fs.writeFileSync(
//       `./db/object-${id}.json`,
//       JSON.stringify(body, null, 4)
//     );
//     fs.writeFileSync(
//       `./db/object-${id}.json`,
//       JSON.stringify(body, null, 4)
//     );
//     response.status(201).send("greet added");
//   } catch (e) {
//     response.status(500).json({ message: "Error!", error: e });
//   }
// });

