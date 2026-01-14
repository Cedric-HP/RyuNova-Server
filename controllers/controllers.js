const { createThumbnail } = require("../utilitises/thumbnail/createThumbnail");

exports.getTestTumbnail = async (req, res) => {
    const path1 = await createThumbnail("api\\banner\\full\\1768380145727.jpg", "banner", 300)
    res.status(200).json({state: true, message: "Thumbnail created!", path1: path1})
};
