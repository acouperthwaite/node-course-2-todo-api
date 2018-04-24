// const MongoClient = require('mongodb').MongoClient;
// const {MongoClient} = require('mongodb'); //identical to the above

const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if (err){ //user return statement to stop rest of code from running
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server');

//find returns a pointer, so use additional functions
//toArray returns a promise, so use then
  // db.collection('Todos').find({
  //     _id:new ObjectID('5add450fc413173af8204183')
  //   }).toArray().then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('Unable to fetch todos',err);
  // });

  // db.collection('Todos').find().count().then((count)=>{
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos',err);
  // });

  db.collection('Users').find({name:'Andrew'}).toArray().then((users)=>{
    console.log('Users');
    console.log(JSON.stringify(users,undefined,2));
  }, (err) => {
    console.log('Unable to fetch todos',err);
  });

  // db.close(); //close connection to database
});
