const express = require (`express`);
const app = express();
app.listen(3000 , ()=> { console.log("lissning at 3000")} );


app.use(express.json());
const fs = require("fs");





/////nitzan:


app.get("/", (request, response) => {
  response.send("Hello everyone!");
});

app.get("/:id", (request, response) => {
  const { id } = request.params;
  response.send(`Hello ${id}!`);
});

app.post("/", (request, response) => {
  const { body } = request;
  try {
    fs.writeFileSync(
      `./greets/greet-${Date.now()}.json`,
      JSON.stringify(body, null, 4)
    );
    response.status(201).send("greet added");
  } catch (e) {
    response.status(500).json({ message: "Error!", error: e });
  }
});

app.put("/:created", (request, response) => {
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