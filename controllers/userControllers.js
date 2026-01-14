const { findUserById } = require("../services/user/findUserById");
const { getProfileData } = require("../services/user/getProfileData");
const { follow } = require("../services/user/follow");

exports.getProfile = (req, res) => {
    getProfileData(req, res)
};

exports.getUserById = (req, res) => {
    findUserById(req, res)
};

exports.getFollow = (req, res) => {
    follow(req, res)
};

