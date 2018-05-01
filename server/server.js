//server.js
//responsible for routes only

var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} =require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos}); //sending an object allows you to add other custom fields, look at this later
  },(e)=>{
    res.status(400).send(e);
  });
});

// GET /todos/1234324 (similar to find user by id)

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  //validate ID using isValid
    // if not valid, respond with 404 - send empty body (send())
    if (!ObjectID.isValid(id)){
      res.status(404).send();
    }
  // findById
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  },(e)=>{
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req,res)=>{
  // get the id
  var id = req.params.id;

  // validate the id -> not valid return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  // remove todo by id
  // success
    // if no doc, send 404
    // if doc, send doc back with 200
  // error
    //400 with empty body
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  },(e)=>{
    res.status(400).send();
  });
});

app.listen(port, ()=>{
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
