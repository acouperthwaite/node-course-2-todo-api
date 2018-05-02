var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect(`mongodb://${dbuser}:${dbpass}@ds157475.mlab.com:57475/todoapp`)

module.exports = {mongoose};
