const { addContentView } = require("../services/content/addContentView");
const { findImageById } = require("../services/image/findImageById")

exports.getImageById = (req, res) => {
    findImageById(req, res)
}

exports.getAddImageView = (req, res) => {
    addContentView(req, res, "image")
};

exports.getAddCommentView = (req, res) => {
    addContentView(req, res, "comment")
};

