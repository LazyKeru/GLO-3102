const GenerateKey = require('./handlers/randomKey')
class User {
  constructor(username, password) {
    this.username = username
    this.password = password
    this.apiKey = null
  }
}
class UserRepo {
  constructor() {
    this.users = []
    this.apiKeys = []
  }

  addUser(username, password) {
    this.users.push(new User(username, password))
  }

  userExists(username) {
    let flag = false
    this.users.forEach((user) => {
      if (user.username === username) flag = true
    })
    return flag
  }

  getUser(username) {
    let output = null
    this.users.forEach((user) => {
      if (user.username === username) output = user
    })
    return output
  }

  getUserByApiKey(key) {
    let output = null
    this.users.forEach((user) => {
      if (user.apiKey === key) output = user
    })
    return output

  }

  generateApiKey(username) {
    const key = GenerateKey.generateKey()

    while(this.getUserByApiKey(key))
      key = GenerateKey.generateKey()
      
    let user = this.getUser(username)

    user.apiKey = key
    return key
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new UserRepo()
    }
  }

  getInstance() {
    return Singleton.instance
  }
}

module.exports = Singleton
