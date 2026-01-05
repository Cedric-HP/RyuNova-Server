const BCRYPT_HASH = parseInt(process.env.BCRYPT_HASH)
const bcrypt = require("bcrypt");
const { User } = require("../../models/user.js");
const { registerBodyValidation } = require("../../utilitises/bodyValidation/registerBodyValidation.js");

const register = async (req, res) => {
    const validate = registerBodyValidation(req)
    if (!validate.status)
        return res.status(500).json({state: false, error: validate.error})
    if (!validate.validate)
        return res.status(400).json({state: true, message: validate.message})
    try {
        const hashedPassword = await bcrypt.hash(password, BCRYPT_HASH);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({state: true, data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }})
    }
    catch (error) {
        res.status(400).json({state: false, error: error.message})
    } 
};

module.exports = {register}