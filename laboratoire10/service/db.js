const idGenerator = require('../service/generateID')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const uri = process.env.DB_URI
mongoose.connect(uri)

const taskSchema = new mongoose.Schema({
  userID: 'string',
  id: '',
  name: 'string',
})
const Task = mongoose.model('Task', taskSchema)

const userSchema = new mongoose.Schema({
  userID: 'string',
})
const User = mongoose.model('User', userSchema)

class Db {
  async count() {
    return await User.count()
  }

  async getTasks(userID) {
    const res = await Task.find({ userID: userID })
    return res
  }

  addUser(userID) {
    const newUser = new User({ userID: userID })
    newUser.save(function (err) {
      if (err) console.log('unable to save in db. Details : ' + err)
    })
  }

  async userExists(userID) {
    const res = await User.findOne({ userID: userID })
    return res !== null
  }

  async aUserExists() {
    const res = await User.findOne()
    return res
  }

  async taskExists(userID, taskID) {
    const res = await Task.findOne({ userID: userID, id: taskID })
    return res !== null
  }

  async addTask(userID, name) {
    let unique_id
    do {
      unique_id = idGenerator.generateID()
    } while (await this.taskExists(userID, unique_id))
    const newTask = new Task({ userID: userID, id: unique_id, name: name })
    await newTask.save(function (err) {
      if (err) console.log('unable to save in db. Details : ' + err)
    })
    return { id: unique_id, name: name }
  }

  async updateTask(userID, taskID, name) {
    await Task.updateOne(
      { userID: userID, id: taskID },
      { name: name },
      function (err, res) {
        if (err) console.log('unable to save in db. Details : ' + err)
      }
    ).clone()
  }

  async findTask(userID, taskID) {
    const res = await Task.findOne({userID: userID, id: taskID}).clone()
    return res
  }

  async updateAndFind(userID, taskID, name) {
    await this.updateTask(userID,taskID,name)
    return await this.findTask(userID, taskID)
  }

  async deleteTask(userID, taskID) {
    await Task.deleteOne({ userID: userID, id: taskID })
  }
}

module.exports = Db
