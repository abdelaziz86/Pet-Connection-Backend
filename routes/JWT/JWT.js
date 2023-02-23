const { sign, verify } = require('jsonwebtoken')

const createToken = (user) => {
    const accessToken = sign(
        { username: user.username, id: user.id },
        "azjdn1dkd3ad"); 
    return accessToken; 
}

const validateToken = (req,res,next) => {
    const accessToken = req.cookies["access-token"]
    if (!accessToken) return res.status(400).json({ error: "USER NOT AUTHENTICATED" }); 

    try {
        const validToken = verify(accessToken, "azjdn1dkd3ad"); 
        if (validToken) {
            req.authenticated = true; 
            return next(); 
        }
    } catch (err) {
        return res.status(400).json({error : err})
    }
}

module.exports = { createToken, validateToken }; 