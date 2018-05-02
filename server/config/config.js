var env = process.env.NODE_ENV || 'development';
var dbuser = 'acouperthwaite';
var dbpass = 'couper01';
process.env.MONGODB_URI = `mongodb://${dbuser}:${dbpass}@ds157475.mlab.com:57475/todoapp`;

if(env=== 'development'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
