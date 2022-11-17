var exports = module.exports = {};

exports.heartbeat = (req, res) => {
    res.status(200).json("It's seems like you are alive - some doctor")
}