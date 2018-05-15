const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

//not using arrow functions as we need to find 'this' keyword
//note UserSchema.methods are calls to instance methods (note "user" not "User")
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(), access},'abc123').toString();

  user.tokens = user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });
};

//note UserSchema.statics are to model methods (note "User" not "user")
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token,'abc123');
  }catch (e) {
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });
    return Promise.reject(); //same code as above
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

var User = mongoose.model('User', UserSchema);

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
