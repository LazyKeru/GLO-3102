var exports = (module.exports = {})

var Db = require('../service/db')

var db = new Db()

exports.addTask = async (req, res) => {
  if (await db.userExists(req.params.userId)) {
    res.status(200).json(await db.addTask(req.params.userId, req.body.name))
  } else {
    res.status(500).json({ message: "user id doesn't exist" })
  }
  // db.addTask(req.params.userId, req.body.name)
}

exports.getTask = async (req, res) => {
  if (await db.userExists(req.params.userId))
    res.status(200).json({tasks: await db.getTasks(req.params.userId)})
  else res.status(500).json({ message: "user id doesn't exist" })
}

exports.updateTask = async (req, res) => {
  if (!await db.userExists(req.params.userId))
    res.status(500).json({ message: "user id doesn't exist" })
  if (!await db.taskExists(req.params.userId, req.params.noteId))
    res.status(500).json({ message: "note id doesn't exist for that user" })
  res
    .status(200)
    .json(
      await db.updateAndFind(req.params.userId, req.params.noteId, req.body.name)
    )
}

exports.deleteTask = async (req, res) => {
  if (!await db.userExists(req.params.userId))
    res.status(500).json({ message: "user id doesn't exist" })
  if (!await db.taskExists(req.params.userId, req.params.noteId))
    res.status(500).json({ message: "note id doesn't exist" })
  res.status(200).json(await db.deleteTask(req.params.userId, req.params.noteId))
}
