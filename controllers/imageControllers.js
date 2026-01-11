const { createImage } = require("../services/image/createImage");

exports.postImage = (req, res) => {
    createImage(req, res)
};