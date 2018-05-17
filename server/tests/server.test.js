const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

//runs before each test
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
  it('should create a new todo', (done)=> {
    var text = 'Test todo text';
//check the POST call
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

//check database for the new todo
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done)=> {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2); //should only be two items per the dummies at start of test file
          done();
        }).catch((e)=>done(e));
      });
  });
});

describe('GET /todos',()=> {
    it('should get all todos',(done)=>{
      request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
          expect(res.body.todos.length).toBe(1);
        })
        .end(done);
    });
});

describe('GET /todos/:id',()=> {
  it('should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
        })
      .end(done);
  });
  it('should not return todo doc created by other user', (done)=>{
    request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return a 404 if todo not found', (done)=>{
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
    // make sure get 404 back
  });

  it('should return 404 for non-object ids',(done)=>{
    request(app)
      .get('/todos/123')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
    // /todos/123
  });
});


describe('DELETE /todos/:id',()=> {
  it('should delete and return todo doc', (done)=>{
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
        })
      .end((err,res)=> {
        if (err){
          return done(err);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toBeFalsy(); //toNotExist was depreciated, replace with toBeFalsy
          done();
        }).catch((e)=> done(e));
      });
  });
  it('should delete and return todo doc', (done)=>{
    var hexId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err,res)=> {
        if (err){
          return done(err);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toBeTruthy();
          done();
        }).catch((e)=> done(e));
      });
  });

  it('should return a 404 if todo not found', (done)=>{
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
    // make sure get 404 back
  });

  it('should return 404 for non-object ids',(done)=>{
    request(app)
      .delete('/todos/123')
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
    // /todos/123
  });
});

describe('PATCH /todos/:id',() =>{
  it('should update the todo',(done)=>{
    var hexId = todos[0]._id.toHexString();
    // grab id of first items
    var text = 'This should be the new Text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({text, completed:true})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.completed).toBe(true);
        // expect(res.body.todo.completedAt).toBeA('number');
        expect(typeof res.body.todo.completedAt).toBe('number');
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);
  });
  it('should not update the first todo as second user',(done)=>{
    var hexId = todos[0]._id.toHexString();
    // grab id of first items
    var text = 'This should be the new Text';

    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({text, completed:true})
      .expect(404)
      .end(done);
  });

  it('should clear completedAt when todo is completed', (done)=>{
    var hexId = todos[1]._id.toHexString();
    // grab id of second items
    var text = 'This should be the new Text!!';
    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({text, completed:false})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
        expect(res.body.todo.text).toBe(text);
      })
      .end(done);

  });
});

describe('GET /users/me',() =>{
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it('should return 401 if not authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res)=>{
        expect(res.body).toEqual({});// toEqual for objects (checks all properties)
      })
      .end(done);
  });
});

describe('POST /users',()=>{
  it('should create a user',(done)=>{
    var email = 'example@example.com';
    var password = '123mnb!';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err)=>{
        if (err){
          return done(err);
        }
        User.findOne({email}).then((user)=>{
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password); //.not inverses the expect
          //user.password should be hashed! to should not equal the password
          done();
        }).catch((e)=> done(e));
      });
  });
  it('should return validation errors if request invalid',(done)=>{
    //send invalid email and invalid password
    // expect 400
    var email = 'andrew@example';
    var password = '123';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done);
  });
  it('should not create user if email in use',(done)=>{
    // use email that exists in seed data
    //expect 400
    var email = users[0].email;
    var password = '123mnb!';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .end(done);
  });
});

describe('GET /users/login',()=> {
  it('should login user and return auth token',(done)=>{
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) =>{
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        User.findById(users[1]._id).then((user)=>{
          // expect(user.tokens[1]).toInclude({ //.toInclude has been depreciated
          expect(user.toObject().tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e)=> done(e));
      });
  });
  it('should reject invalid login',(done)=>{
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'wrong password'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy();
      })
      .end((err,res)=> {
        if(err){
          return done(err);
        }
        User.findById(users[1]._id).then((user)=>{
          expect(user.tokens.length).toBe(1);
          done();
        }).catch((e)=>done(e));
      });
  });
});

describe('Delete /users/me/token', ()=>{
  it('should remove auth token on logout', (done)=>{
    //delete /users/me/token
    //set x-auth equal to token
    // 200
    // find user, verify that tokens array has length 0
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err,res)=>{
        if (err){
          return done(err);
        }
        User.findById(users[0]._id).then((user)=>{
            expect(user.tokens.length).toBe(0);
            done();
        }).catch((e)=>done(e));
      });
  });
});
