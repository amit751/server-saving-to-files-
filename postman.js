const express = require (`express`);
const app = express();
app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());
const fs = require("fs");
const objs = fs.readFileSync('./db/all-objs.json',{encoding:'utf8', flag:'r'});

console.log(JSON.parse(objs));

fs.appendFileSync('./db/all-objs.json', 
JSON.stringify({test: 5 , use: 4}), 
  { encoding: "utf8", flag: "w" } 
); 


/////nitzan:


app.get("/api", (request, response) => {
  response.send("Hello everyone!");
});

app.get("/api/:id", (request, response) => {
  const { id } = request.params;
  response.send(`Hello ${id}!`);
});

app.post("/api", (request, response) => {
  const { body } = request;
  const objs = fs.readFileSync('.db/all-objs.json',{encoding:'utf8', flag:'r'});
  objs = JSON.parse(objs);
  
  try {
    fs.writeFileSync(
      `./db/object-${id}.json`,
      JSON.stringify(body, null, 4)
    );
    fs.writeFileSync(
      `./db/object-${id}.json`,
      JSON.stringify(body, null, 4)
    );
    response.status(201).send("greet added");
  } catch (e) {
    response.status(500).json({ message: "Error!", error: e });
  }
});

app.put("api/:id", (request, response) => {
  const { created } = request.params;
  const { body } = request;
  try {
    fs.writeFileSync(
      `./greets/greet-${created}.json`,
      JSON.stringify(body, null, 4)
    );
    response.json(body);
  } catch (e) {
    response.status(500).json({ message: "Error!", error: e });
  }
});