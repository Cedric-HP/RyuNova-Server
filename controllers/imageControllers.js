const { createImage } = require("../services/image/createImage");
const { findFullImageById } = require("../services/image/findFullImageById");

exports.postImage = (req, res) => {
    createImage(req, res)
};

exports.getFullImage = (req, res) => {
    console.log({here: "here"})
    findFullImageById(req, res)
};

