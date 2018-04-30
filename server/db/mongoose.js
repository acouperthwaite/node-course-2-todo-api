var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
var dbuser = 'acouperthwaite';
var dbpass = 'couper01';
mongoose.connect(`mongodb://${dbuser}:${dbpass}@ds157475.mlab.com:57475/todoapp`)

module.exports = {mongoose};
