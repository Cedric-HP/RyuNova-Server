const { findUserById } = require("../services/user/findUserById");
const { getProfileData } = require("../services/user/getProfileData");

exports.getProfile = (req, res) => {
    getProfileData(req, res)
};

exports.getUserById = (req, res) => {
    findUserById(req, res)
};
