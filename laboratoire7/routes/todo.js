var exports = (module.exports = {})

var Memory = require('../service/singletonMemory')

var memory = new Memory().getInstance()

exports.addTask = (req, res) => {
  if (memory.userExists(req.params.userId)) {
    res.status(200).json(memory.addTask(req.params.userId, req.body.name))
  } else {
    res.status(500).json({ message: "user id doesn't exist" })
  }
  // memory.addTask(req.params.userId, req.body.name)
}

exports.getTask = (req, res) => {
  if (memory.userExists(req.params.userId))
    res.status(200).json(memory.getTasks(req.params.userId))
  else res.status(500).json({ message: "user id doesn't exist" })
}

exports.updateTask = (req, res) => {
  if (!memory.userExists(req.params.userId))
    res.status(500).json({ message: "user id doesn't exist" })
  if (!memory.taskExists(req.params.userId, req.params.noteId))
    res.status(500).json({ message: "note id doesn't exist for that user" })
  res
    .status(200)
    .json(
      memory.updateTask(req.params.userId, req.params.noteId, req.body.name)
    )
}

exports.deleteTask = (req, res) => {
  if (!memory.userExists(req.params.userId))
    res.status(500).json({ message: "user id doesn't exist" })
  if (!memory.taskExists(req.params.userId, req.params.noteId))
    res.status(500).json({ message: "note id doesn't exist" })
  res.status(200).json(memory.deleteTask(req.params.userId, req.params.noteId))
}
