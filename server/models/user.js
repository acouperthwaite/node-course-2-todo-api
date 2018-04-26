var mongoose = require('mongoose');

var User = mongoose.model('User',{
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


module.exports = {User};






// User Model
// User
// email - require, trim, type = string, minlength = 1
//
// var newUser = new User({email:'acouperthwaite@gmail.com'});
// newUser.save().then((doc)=>{
//   console.log('Saved new User',doc);
// },(e)=>{
//   console.log('Unable to create new User',e);
// });
