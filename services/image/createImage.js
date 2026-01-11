const { Image } = require("../../models");
const path = require("path");
const { moveFile } = require("../../utilitises/fs/moveFile");

const createImage = async (req, res) => {
    try {
        const {imageCategory} = req.body
        const title = req.body.title || ""
        const description = req.body.description || ""
        if (imageCategory === "image" && title === "")
            return res.status(200).json({state: false, message: "Title is required for 'image' category"})
        const oldPath = path.join(req.file.path)
        const newPath = oldPath.replace(`api\\`, `api\\${imageCategory}\\full\\`)
        try {
            await moveFile(oldPath, newPath);
        } catch (error) {
            throw error
        }
        const image = await Image.create({
            title: title,
            description: description,
            imageCategory: imageCategory,
            url: newPath,
            userId: req.user.id  
        });
        await image.save();
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
