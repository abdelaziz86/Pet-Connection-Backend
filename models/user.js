const mongo = require('mongoose');
const schema = mongo.Schema; 

var User = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    }
}); 
module.exports = mongo.model("user", User)