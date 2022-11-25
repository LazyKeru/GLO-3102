var exports = (module.exports = {})

const UserRepo = require('../userRepo')

const userRepo = new UserRepo().getInstance()

exports.createUser = (req, res) => {
  if (!userRepo.userExists(req.body.username)) {
    userRepo.addUser(req.body.username, req.body.password)
    res.status(200).json({ message: 'username has been created' })
  } else res.status(500).json({ message: 'username already in use' })
}

exports.getUser = (req, res) => {
  if (userRepo.userExists(req.body.username)) {
    const user = userRepo.getUser(req.body.username)
    if (user.apiKey === req.body.apiKey) {
      res.status(200).json(user)
    } else {
      res.status(401).json({message: 'not authorized'})
    }
  } else {
    res.status(404).json({ message: 'user does not exist' })
  }
}
