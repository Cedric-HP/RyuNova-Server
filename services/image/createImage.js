const { Image } = require("../../models");
const path = require("path");
const createImage = async (req, res) => {
    try {
        console.log(path.join("uploads", req.file.filename ))
        const {imageCategory} = req.body
        const title = req.body.title || ""
        const description = req.body.description || ""
        if (imageCategory === "image" && title === "")
            return res.status(200).json({state: false, message: "Title is required for 'image' category"})
        const image = await Image.create({
            title: title,
            description: description,
            imageCategory: imageCategory,
            path: path.join("uploads", req.file.filename ),
            userId: req.user.id  
        });
        image.set({
            url: `/image/full/${image.id}`
        }) 
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
