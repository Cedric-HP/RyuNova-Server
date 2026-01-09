const {Image} = require("../../models")
const path = require("path");
const findFullImageById = async (req, res) =>{
    try {
        const imageId = req.params.imageFullId
        const image = await Image.findOne({
            where: {id: imageId},
            attributes: { 
                exclude: ["updatedAt", "createdAt", "id", "title", "description", "views"]     
            }
        });
        if (!image) {
            return res.status(200).json({state: false, error: `Image id: ${imageId} not found!` });
        }
        console.log(path.resolve(__dirname+ "../../" + `${image.path}`))
        res.sendFile(path.resolve(__dirname+ "../../" + `${image.path}`));
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {findFullImageById}