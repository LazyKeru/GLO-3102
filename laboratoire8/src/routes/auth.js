var exports = (module.exports = {})

const UserRepo = require('../userRepo')

const userRepo = new UserRepo().getInstance()

exports.login = (req,res) => {
  const user = userRepo.getUser(req.body.username)
  if(user && user.password === req.body.password) {
    const apiKey = userRepo.generateApiKey(req.body.username)
    res.status(200).json({ apiKey: apiKey })
  } else {
    res.status(404).json({ message: 'user credentials not correct' })
  }
}

