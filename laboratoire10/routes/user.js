var exports = (module.exports = {})

const idGenerator = require('../service/generateID')

var Db = require('../service/db')

var db = new Db()

exports.newUser = async (req, res) => {
  const user = await db.aUserExists()
  if (user) {
    res.status(200).json({ id: user.userID, count: await db.count() })
  } else {
    let id
    do {
      id = idGenerator.generateID()
    } while (await db.userExists(id))
    db.addUser(id)
    res.status(200).json({ id: id, count: await db.count() })
  }
}
