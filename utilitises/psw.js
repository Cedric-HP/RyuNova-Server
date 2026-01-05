require("dotenv").config();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function authenticationPSW(req, res, next){
    try {
        if(!req.headers.xadminpassword) throw {message : "Missing or invalid X-Admin-Password"}
        const psw = req.headers.xadminpassword
        if (psw !== ADMIN_PASSWORD) throw {message : "Missing or invalid X-Admin-Password"}
        next()
    } catch (error) {
        res.status(401).json({state: false, error: error.message})
    }
}

module.exports = { authenticationPSW };