var env = process.env.NODE_ENV || 'development';
var dbuser = 'acouperthwaite';
var dbpass = 'couper01';
process.env.MONGODB_URI = `mongodb://${dbuser}:${dbpass}@ds157475.mlab.com:57475/todoapp`;

if (env === 'development' || env === 'test'){
      var config = require('./config.json');
      var envConfig = config[env];

      Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key];
      });
}
//

//  Above keeps test/dev vars out of the code and into config.json (which we don't upload to github nor heroku)
//  Also allows for easy maintenance of key pairs (don't modify code, just update json file)

// if(env=== 'development'){
//   process.env.PORT = 3000
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test'){
//   process.env.PORT = 3000
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
