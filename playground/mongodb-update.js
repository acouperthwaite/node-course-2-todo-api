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

// findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5ade9c4f5678afa5c89f6c93')
  // },{
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false //return the new object, not the original
  // }).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5add465de1c3d62330ed42fb')
  },{
    $set: {name: 'Andrew'},
    $inc: {age: 1}
  },{
    returnOriginal: false //return the new object, not the original
  }).then((result)=>{
    console.log(result);
  });

  // db.close(); //close connection to database
});
