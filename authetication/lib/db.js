var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database
// var username = "mogonlab_demo"
// var password = "password";
// var address = ' @ds049858.mongolab.com:49858/appdemo';
connect();

// Connect to mongo
function connect() {
  // var url = 'mongodb://' + username + ':' + password + address;
  var url = 'mongodb://localhost:27017/appdemo'
  mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}