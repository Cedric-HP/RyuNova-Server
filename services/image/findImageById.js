const {Image, Tag_Image} = require("../../models")

const findImageById = async (req, res) =>{
    try {
        const imageId = req.params.imageId
        const image = await Image.findOne({
            where: {id: imageId},
            attributes: { 
                exclude: ["updatedAt"]     
            },
            include: [ 
                "author", 
                "imageLikes", 
                "commentList", 
                {
                    association: "tagList", 
                    attributes: {
                        exclude: [
                            "id", 
                            "createdAt", 
                            "updatedAt"
                        ]
                    },
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (!image) {
            return res.status(404).json({state: false, error: `Image id: ${imageId} not found!` });
        }
        const imageFindData = {
            id: image.id,
            title: image.title,
            description: image.description,
            authorId: image.authorId,
            url: image.url,
            views: image.views,
            likes: image.imageLikes.length,
            commentList: image.commentList,
            tags: image.tagList,
            createdAt: image.createdAt
        }
        res.status(200).json({state: true, data: imageFindData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {findImageById}

