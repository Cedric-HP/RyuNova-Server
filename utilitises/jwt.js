require("dotenv").config();
const jwt = require("jsonwebtoken");
const {User, BlackListToken} = require("../models/index.js");
const ACCESS_SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ALGORITHM = process.env.JWT_ALGORITHM;

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, ACCESS_SECRET, { expiresIn: EXPIRES_IN, algorithm: ALGORITHM });
}

const  authentication = async (req, res, next)=>{
    try {
        if(!req.headers.authorization) throw {message : "Invalid token"}

        const [type, token] = req.headers.authorization.split(" ")
        const checkIfBlacklisted = await BlackListToken.findOne({where: {token: token}})
        if (checkIfBlacklisted) throw {message : "Invalid token"}

        if(type !== "Bearer") throw {name : "Invalid token"}

        const payload =  jwt.verify(token, ACCESS_SECRET)
        if(!payload) throw {message : "Invalid token"}

        const user = await User.findByPk(payload.userId)
        if(!user) throw {message : "Invalid token"}

        console.log({AUTH: true})
        req.user = {
            id : parseInt(user.id),
            role: user.role
        }
        next()
    } catch (error) {
        res.status(401).json({state: false, authorized: false, error: error.message})
    }
}

module.exports = { generateAccessToken, authentication };

