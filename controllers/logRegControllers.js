const { login } = require("../services/logReg/login");
const { register } = require("../services/logReg/register");

exports.postLogin = async (req, res) => {
    login(req, res)
};

exports.postRegister = (req, res) => {
    register(req, res)
};
