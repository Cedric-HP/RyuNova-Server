const {Image} = require("../../models")

const findFullImageById = async (req, res) =>{
    try {
        const imageId = req.params.imageId
        const image = await Image.findOne({
            where: {id: imageId},
            attributes: { 
                exclude: ["updatedAt", "createdAt", "id", "title", "description", "url", "views"]     
            },
            include: [ "authorId"]
        });
        if (!image) {
            return res.status(200).json({state: false, error: `Image id: ${imageId} not found!` });
        }
        const imageFindData = {
            imageType: image.imageType,
            imageName: image.imageName,
            imageData: image.imageData.toString('base64') 
        }
        res.status(200).json({state: true, data: imageFindData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {findFullImageById}