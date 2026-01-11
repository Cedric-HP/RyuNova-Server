const { createThumbnail } = require("../utilitises/thumbnail/createThumbnail");

exports.getTestTumbnail = async (req, res) => {
    const path1 = await createThumbnail("api\\image\\full\\1768060254621.jpg", "image", 600)
    const path2 = await createThumbnail("api\\image\\full\\1768060254621.jpg", "image", 300)
    res.status(200).json({state: true, message: "Thumbnail created!", path1: path1, path2: path2})
};
