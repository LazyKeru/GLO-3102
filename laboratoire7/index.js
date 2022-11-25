const express = require('express')
const todo = require('./routes/todo.js')
const user = require('./routes/user.js')
const heartbeat = require('./routes/heartbeat.js')

const app = express()
const port = 8000

var bodyParser = require('body-parser')

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log('Server listening on port ' + port + '...')
})

app.get('/heartbeat', heartbeat.heartbeat)

app.post('/:userId/tasks', todo.addTask)

app.get('/:userId/tasks', todo.getTask)

app.post('/users', user.newUser)

app.put('/:userId/tasks/:noteId', todo.updateTask)

app.delete('/:userId/tasks/:noteId', todo.deleteTask)
