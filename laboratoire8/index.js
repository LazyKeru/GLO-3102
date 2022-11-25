const express = require('express')
const app = express()
const port = 8000
const users = require('./src/routes/users')
const auth = require('./src/routes/auth')

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

app.get('/users', users.getUser)

app.post('/users', users.createUser)

app.post('/login', auth.login)

