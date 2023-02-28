const User = require('../models/user')
const express = require('express')
const { createToken, validateToken } = require('../midill/JWT/JWT'); 
const bcrypt = require("bcrypt"); 




const register = (req, res) => {
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
}

const login = async (req, res) => {
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
}

const getAll = (req, res, next) => {
    try {
        User.find({}).then(result => {
            res.send(result)
        })
    } catch (err) {
        console.log(err)
    }
}

const profile = async (req, res) => {
    try {
        await User.findById(req.params.id).then(result => {
            res.send(result)
        }) 
    } catch(err) {
        res.send(err)
    }
}

const update = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body).then(result => {
            res.send("User updated!")
        }) 
    } catch (err) {
        res.send(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove
    } catch (err) {
        res.send(err)
    }
}


module.exports = { register, login, profile, getAll, update }
