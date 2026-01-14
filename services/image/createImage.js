const { Image, User } = require("../../models");
const path = require("path");
const { moveFile } = require("../../utilitises/fs/moveFile");
const { createThumbnail } = require("../../utilitises/thumbnail/createThumbnail");
const { tagHandler } = require("../../utilitises/tag/tagHandler");
const { setAvatarBanner } = require("../../utilitises/user/setAvatarBanner");
const thumbnailLists ={
    "image": [400, 750],
    "avatar": [30, 50, 55, 75, 200],
    "banner": [300, 750]
}
const createImage = async (req, res) => {
    try {
        const {imageCategory} = req.body
        const title = req.body.title || ""
        const description = req.body.description || ""
        const tags = req.body.tags || ""
        if (imageCategory === "image" && title.length < 3)
            return res.status(200).json({state: false, message: "Title is required or is too short for 'image' category to upload!"})
        const oldPath = path.join(req.file.path)
        const newPath = oldPath.replace(`api\\`, `api\\${imageCategory}\\full\\`)
        try {
            await moveFile(oldPath, newPath);
        } catch (error) {
            throw error
        }
        const thumbnailList = thumbnailLists[imageCategory]
        for (const size of thumbnailList) {
            await createThumbnail(newPath, imageCategory, size)
        }
        const image = await Image.create({
            title: title,
            description: description,
            imageCategory: imageCategory,
            url: newPath,
            userId: req.user.id  
        });
        if (tags.trim() !== "")
            await tagHandler(tags, image)
        await image.save();
        if (imageCategory === "avatar" || imageCategory === "banner")
            setAvatarBanner(imageCategory, req.user.id, image)
        res.status(201).json({state: true, data: {
                id: image.id, 
                imageCategory: image.imageCategory,
                url: image.url
            }})
    }
    catch (error) {
        res.status(500).json({state: false, error: error.message})
    } 
};

module.exports = {createImage}