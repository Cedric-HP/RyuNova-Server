const { createThumbnail } = require("../utilitises/thumbnail/createThumbnail");

exports.getTestTumbnail = async (req, res) => {
    const path1 = await createThumbnail("api\\image\\full\\1768205280188.jpg", "image", 750)
    res.status(200).json({state: true, message: "Thumbnail created!", path1: path1})
};
