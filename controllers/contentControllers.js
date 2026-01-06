const { findImageById } = require("../services/image/findImageById");

exports.getImageById = (req, res) => {
    findImageById(req, res)
};
