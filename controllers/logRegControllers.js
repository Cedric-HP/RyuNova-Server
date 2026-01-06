const { checkDuplicate } = require("../services/logReg/checkDuplicate");
const { login } = require("../services/logReg/login");
const { logout } = require("../services/logReg/logout");
const { register } = require("../services/logReg/register");

exports.postLogin = (req, res) => {
    login(req, res)
};

exports.postRegister = (req, res) => {
    register(req, res)
};

exports.postLogout = (req, res) => {
    logout(req, res)
};

exports.getCheckDuplicate = (req, res) => {
    checkDuplicate(req, res)
};

exports.getStatus = (req, res) => {
    res.status(200).json({state: true, message: "authorize!"})
};