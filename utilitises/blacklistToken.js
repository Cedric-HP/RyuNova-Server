const { BlackListToken } = require("../models");

const blacklistToken = async (accessToken) => {
    try {
        await BlackListToken.findOrCreate({where: {token: accessToken}})
    }
    catch (err) {
        throw {message : err}
    }
}
module.exports = {blacklistToken}