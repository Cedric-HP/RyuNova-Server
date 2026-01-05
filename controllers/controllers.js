const BCRYPT_HASH = parseInt(process.env.BCRYPT_HASH)
const bcrypt = require("bcrypt");
// const { generateAccessToken } = require('../utils/jwt');
const { getEntityList } = require("../service/getEntityList");
const { createEntity } = require("../service/createEntity");
const { updateEntity } = require("../service/updateEntity");
const { deleteEntity } = require("../service/deleteEntity");
const { navigation } = require("../service/navigation");

// Get Status

exports.getStatus = (req, res) => {
    const payload = {
        scgStatus: "online"
    }
    res.status(200).json(payload)
};

// Get Entity List

exports.getEntity = (req, res) => {
    getEntityList(req, res)
};

// Post Entity

exports.postEntity = (req, res) => {
    createEntity(req, res)
};

// Put Entity

exports.putEntity = (req, res) => {
    updateEntity(req, res)
};

// Delete Entity

exports.deleteEntity = (req, res) => {
    deleteEntity(req, res)
};

// Navigation

exports.navigation = (req, res) => {
    navigation(req, res)
};
