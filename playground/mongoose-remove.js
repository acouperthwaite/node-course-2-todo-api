const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// }); //removes all todos


// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findOneAndRemove({_id:'5ae7dca3b7da3b8a1dd92f09'}).then((todo)=> {
  console.log(tood);
});


Todo.findByIdAndRemove('5ae7dca3b7da3b8a1dd92f09').then((todo)=>{
  console.log(todo);
});
