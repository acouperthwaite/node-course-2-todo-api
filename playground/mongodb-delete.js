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

//deleteMany
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
  //   console.log(result);
  // });


//deleteOne
  // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
  //   console.log(result);
  // })

//findOneAndDelete (returns the todo and deletes it)
  // db.collection('Todos').findOneAndDelete({completed:false}).then().then((result)=>{
  //   console.log(result);
  // })

  //challenge code
  db.collection('Users').deleteMany({name:'Andrew'}).then((result)=>{
    console.log(result);
  });
  db.collection('Users').findOneAndDelete({
      _id:new ObjectID('5ade71554222e02964cdb101')
    }).then((result)=>{
    console.log(result);
  });

  // db.close(); //close connection to database
});
