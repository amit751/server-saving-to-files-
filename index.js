
//
const express = require (`express`);
const app = express();
app.listen(3000 , ()=> { console.log("lissning at 3000")} );
app.use(express.static(`public`));

app.use(express.json());


///experamint:
app.get('/db', (req, res)=>{         //URL
    res.send("tasks")
});

app.get('/db/:id', (req, res)=>{
    const id = req.params.id;
    const data = readFileSync('./'+id+'.JSON', 
            {encoding:'utf8', flag:'r'});
    res.send(data);
    // for(let task of tasks){
    //     if(task.id === id){
    //         res.send(task);
    //     }
    // }
});

app.post('/db',(req, res)=>{
    tasks.push(req.body);
    res.send('ok');
});

app.put('/task',(req, res)=>{
    for(let i = 0; i< tasks.length; i++){
        if(tasks[i].id === req.body.id){
           tasks[i] = req.body;
        res.send(req.body);
        }
    }
});

app.delete('/task',(req, res)=>{
    for(let i = 0; i< tasks.length; i++){
        if(tasks[i].id === req.body.id){
           tasks.splice(i, 1);
            res.send('removed');
        }
    }
});

/////nitzan:


app.get("/", (request, response) => {
  response.send("Hello everyone!");
});

app.get("/:name", filterBadWords, (request, response) => {
  const { name } = request.params;
  response.send(`Hello ${name}!`);
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

