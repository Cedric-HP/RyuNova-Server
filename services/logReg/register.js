const BCRYPT_HASH = parseInt(process.env.BCRYPT_HASH)
const bcrypt = require("bcrypt");
const { User } = require("../../models/index.js");
const { registerBodyValidation } = require("../../utilitises/bodyValidation/registerBodyValidation.js");

const register = async (req, res) => {
    const validate = await registerBodyValidation(req)
    if (!validate.status) {
        return res.status(500).json({state: false, error: String(validate.error)})
    }
    if (!validate.validate)
        return res.status(400).json({state: true, message: validate.message})
    try {
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, BCRYPT_HASH);
        const user = await User.create({
            name: name,
            email: email,
            hashedPassword: hashedPassword,
        });
        res.status(201).json({state: true, data: {
            id: user.id
        }})
    }
    catch (error) {
        res.status(400).json({state: false, error: error.message})
    } 
};

module.exports = {register}