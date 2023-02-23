const express = require('express')
const router = express.Router();
const User = require('../models/user')
const bodyparser = require("body-parser")


router.get('/show', (req, res, next) => {
    res.send("bonjour")
})

 
module.exports = router; 