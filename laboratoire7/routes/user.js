var exports = module.exports = {};

const idGenerator = require('../service/generateID') 

var Memory = require('../service/singletonMemory');

var memory = new Memory().getInstance();

exports.newUser = (req, res) => {
    let id
    do {
        id = idGenerator.generateID()
    } while (memory.userExists(id));
    memory.addUser(id)
    res.status(200).json({ id: id, count: memory.count})
}