const {BlackListToken} = require("../../models/index.js")

const logout = async (req, res) =>{
    const respond ={state: true, message: "Successful logout"}
    try {
        const [__, accessToken] = req.headers.authorization.split(" ")
        const checkIfBlacklisted = await BlackListToken.findOne({where: {token: accessToken}})
        if (checkIfBlacklisted) return res.status(201).json(respond)
        try {
            await BlackListToken.create({token: accessToken})
            res.status(201).json(respond);
        }
        catch (err) {
            throw {message : err}
        }
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {logout}