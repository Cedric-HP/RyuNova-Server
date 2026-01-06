const { blacklistToken } = require("../../utilitises/blacklistToken");

const logout = async (req, res) =>{
    try {
        const [__, accessToken] = req.headers.authorization.split(" ")
        blacklistToken(accessToken)
        res.status(201).json({state: true, message: "Successful logout"});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {logout}