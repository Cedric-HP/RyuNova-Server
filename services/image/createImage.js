const { User, Image } = require("../../models");

const createImage = async (req, res) => {
    try {
        const {imageCategory} = req.body
        const title = req.body.title || ""
        const description = req.body.dexcription || ""
        if (imageCategory === "image" && title === "")
            return res.status(200).json({state: false, message: image})
        const image = await Image.create({
            title: title,
            description: description,
            imageCategory: imageCategory,
            imageType: req.file.mimetype,
            imageName: req.file.originalname,
            imageData: req.file.buffer,
            authorId: req.user.id  
        },
            { include: ["authorId"] }
        );
        image.set({
            url: `/image/full/${image.id}`
        })
        await image.save();
        res.status(201).json({state: true, data: image})
    }
    catch (error) {
        res.status(500).json({state: false, error: error.message})
    } 
};

module.exports = {createImage}