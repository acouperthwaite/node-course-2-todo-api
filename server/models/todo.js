// Todo model

var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text:{
    type: String,
    required: true,
    minlength: 1, //can't have an empty string
    trim: true //can't be a series of white spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};






// var newTodo = new Todo({
//   text: '   Edit this video  '
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo',e);
// });
