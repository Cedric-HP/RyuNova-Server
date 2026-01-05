const {User} = require("../../models/user.js")
const { generateAccessToken } = require("../../utilitises/jwt")
const bcrypt = require("bcrypt");

const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        // Chercher l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({state: false, error: "Incorrect email or password" });
        }

        // Vérifier le mot de passe
        const valid = await bcrypt.compare(password, user.hashedPassword);
        if (!valid) {
            return res.status(401).json({state: false, error: "Incorrect email or password" });
        }

        const accessToken = generateAccessToken(user);

        res.json({state: true, message: "Successful login", userId: user.id , token: accessToken});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {login}