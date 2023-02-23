const express = require('express');
const http = require('http')
const mongo = require('mongoose'); 
const mongoconnection = require('./config/mongoconnection.json'); 
const bodyParser = require("body-parser")


// =========== Database Connection ==============
mongo.connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DataBase Connected");
}).catch((err) => {
    console.log(err);
});


// ============= configuration express ================
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ============ routes =================
var useRouter = require('./routes/User/user'); 
app.use('/user', useRouter); 






 




// ========= server creation =============
const server = http.createServer(app); 
server.listen(3000, () => console.log('server'))
