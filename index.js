require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');

const fruits = require('./fruits.js');

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello Fruity!");
})

app.get('/fruits', (req,res) => {
    res.send(fruits);
})

app.get('/fruits/:name', (req,res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);
    if(fruit === undefined) {
        res.status(404).send("The fruit doesnt exist");

    } else {
        res.send(fruit);
    }
    // let result = fruits.find(item => item = req.params.name);
    // res.send(result);
                   
    });

    const ids = fruits.map((fruit) => fruit.id);
    let maxId = Math.max(...ids);

 app.post('/fruits', (req,res)=> {
        const fruit = fruits.find((fruit => fruit.name.toLowerCase() == req.body.name.toLowerCase()))
                   if(fruit != undefined) {
            res.status(409).send("The fruit already exists");
            } else {
            maxId += 1;
            req.body.id = maxId; // the id is attached to the body now.
            
            fruits.push(req.body);
            res.status(201).send(req.body);
            }
     });
    
    
    
    app.delete("/fruits/:name", (req,res) => {
        const name = req.params.name.toLowerCase();
        const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name);
        if(fruitIndex == -1) {
            res.status(404).send("The fruit doesnt exist")
        } else {
            fruits.splice(fruitIndex,1);
            res.sendStatus(204);
        }
    })

app.listen(port, () => console.log(`App running on port: ${port}`));
    
