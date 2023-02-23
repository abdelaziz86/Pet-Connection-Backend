const express = require('express')
const router = express.Router();
const User = require('../../models/user')
const bodyparser = require("body-parser")

const bcrypt = require("bcrypt")

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



router.get("/all", (req, res, next) => {
    try {
        User.find({}).then(result => {
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
})

 
module.exports = router; 