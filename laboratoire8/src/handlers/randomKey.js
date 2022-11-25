var exports = (module.exports = {})

exports.generateKey = () => {
  return Math.floor(1000 * Math.random()).toString() + Date.now().toString() // random enough, right ? 
}
