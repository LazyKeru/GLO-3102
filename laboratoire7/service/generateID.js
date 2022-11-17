var exports = module.exports = {};

exports.generateID = () => {
    return Math.floor(1000 * Math.random()).toString() + Date.now().toString()  
}