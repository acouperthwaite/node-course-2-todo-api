// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //identical to the above

const {MongoClient,ObjectID} = require('mongodb');

//object destructuring (part of es6)
// var user = {name:'andrew', age:32};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err){ //user return statement to stop rest of code from running
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // },(err,result)=>{
  //   if (err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  // db.collection('Users').insertOne({
  //   name: 'Andrew',
  //   age: 32,
  //   location: '24 sussex dr Ottawa'
  // },(err,result)=>{
  //   if (err){
  //     return console.log('Unable to insert User', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });


  db.close(); //close connection to database
});
