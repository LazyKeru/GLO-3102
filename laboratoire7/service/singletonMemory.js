const idGenerator = require('../service/generateID')

class Memory {
  constructor() {
    this.users = new Map()
  }

  get count() {
    // Number of users
    return this.users.size
  }

  getTasks(userID) {
    let res = { tasks: [] }
    for (const task of this.users.get(userID)[Symbol.iterator]()) {
      res.tasks.push({ id: task[0], name: task[1] })
    }
    return res
  }

  addUser(userID) {
    this.users.set(userID, new Map())
  }

  userExists(userID) {
    return this.users.has(userID)
  }

  taskExists(userID, taskID) {
    return this.users.get(userID).has(taskID)
  }

  addTask(userID, name) {
    let unique_id
    do {
      unique_id = idGenerator.generateID()
    } while (this.taskExists(userID, unique_id))
    this.users.get(userID).set(unique_id, name)
    return { id: unique_id, name: name }
  }

  updateTask(userID, taskID, name) {
    this.users.get(userID).set(taskID, name)
    return { id: taskID, name: name }
  }

  deleteTask(userID, taskID) {
    this.users.get(userID).delete(taskID)
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new Memory()
    }
  }

  getInstance() {
    return Singleton.instance
  }
}

module.exports = Singleton
