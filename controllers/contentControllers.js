const { addContentView } = require("../services/content/addContentView");
const { createComment } = require("../services/content/createComment");
const { searchComment } = require("../services/content/searchComment");
const { searchContent } = require("../services/content/searchContent");
const { toggleLike } = require("../services/content/toggleLike");
const { findImageById } = require("../services/image/findImageById")

exports.getImageById = (req, res) => {
    findImageById(req, res)
}

exports.getAddImageView = (req, res) => {
    addContentView(req, res, "image")
}

exports.getAddArticleView = (req, res) => {
    addContentView(req, res, "article")
}

exports.getSearch = (req, res) => {
    searchContent(req, res)
}

exports.getComment = (req, res) => {
    searchComment(req, res)
}

exports.postComment = (req, res) => {
    createComment(req, res)
}

exports.postLike = (req, res) => {
    toggleLike(req, res)
}
