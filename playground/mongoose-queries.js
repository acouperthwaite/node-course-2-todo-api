const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
// var id = '5ae537e271046d9804b1236811';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
// //returns an array of objects
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// //returns the object instead of an array
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });

//simpler that findOne, use if querying by id
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((e)=> console.log(e));

var id = '5ae1403eb85999d833ec0bc4';

User.findById(id).then((user)=>{
  if(!user){
    return console.log('User Id not found');
  }
  console.log(JSON.stringify(user,undefined,2));
}, (e) => {
  console.log(e);
});
