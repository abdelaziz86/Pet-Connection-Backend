const express = require('express')
const router = express.Router();
const User = require('../../models/user')
const bodyparser = require("body-parser")

const bcrypt = require("bcrypt"); 
const cookieParser = require("cookie-parser")

router.use(express.json())
router.use(cookieParser())

const { createToken, validateToken } = require('../JWT/JWT'); 




router.get('/show', (req, res, next) => {
    res.send("bonjour")
})

router.post("/register", (req, res) => {
    const { username, password } = req.body; 

    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            password : hash
        }).then(() => {
            res.json("USER REGISTERED"); 
        }).catch((err) => {
            if (err) {
                res.status(400).json({error : err})
            }
        })
    })
})


router.post("/login", async (req, res) => {
    const { username, password } = req.body; 
    const user = await User.findOne({ username: username }); 

    if (!user) res.status(400).json({ error: "User doesn't exist" })
    const dbPassword = user.password
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({
                error : "Wrong username and password combination"
            })
        } else {
            const accessToken = createToken(user); 
            res.cookie("access-token", accessToken, {
                maxAge : 60*60*24*30*1000 
            }) // cookie expires after 30 days
            res.json("USER LOGGINED"); 

        }
    })


})







router.get("/all", (req, res, next) => {
    try {
        User.find({}).then(result => {
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
})


router.get("/profile", validateToken, (req, res) => {
    res.json("profile");
})
 
module.exports = router; 