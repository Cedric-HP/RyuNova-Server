require("dotenv").config();
const jwt = require("jsonwebtoken");
const {User} = require("../models/user.js");

const ACCESS_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, ACCESS_SECRET, { expiresIn: EXPIRES_IN });
}

async function authentication(req, res, next){
    try {
        if(!req.headers.authorization) throw {message : "Invalid token"}
        const [type, token] = req.headers.authorization.split(" ")
        if(type !== "Bearer") throw {name : "Invalid token"}
        console.log({here: token})
        const payload =  jwt.verify(token, ACCESS_SECRET)
        console.log({payload: payload})
        if(!payload) throw {message : "Invalid token"}
        const user = await User.findByPk(payload.userId)
        if(!user) throw {message : "Invalid token"}
        req.user = {
            id : user.id
        }
        next()
    } catch (error) {
        res.status(401).json({state: true, validate: false, error: error.message})
    }
}

module.exports = { generateAccessToken, authentication };