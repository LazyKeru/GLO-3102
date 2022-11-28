var exports = (module.exports = {})

const UserRepo = require('../userRepo')

const userRepo = new UserRepo().getInstance()

exports.createUser = (req, res) => {
  if (!userRepo.userExists(req.body.username)) {
    userRepo.addUser(req.body.username, req.body.password)
    res.status(200).json({ message: 'username has been created' })
  } else {
    res.statusMessage = 'username already in use'
    res.status(409).end()
  }
}

exports.getUser = (req, res) => {
  const user = userRepo.getUserByApiKey(req.params.apiKey)
  if (user) {
      res.status(200).json(user)
  } else {
    res.statusMessage = 'unauthorized, please login'
    res.status(401).end()
  }
}
