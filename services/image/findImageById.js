const {Image} = require("../../models")
const { literal } = require("sequelize");

const findImageById = async (req, res) =>{
    try {
        const imageId = req.params.imageId
        const image = await Image.findOne({
            where: {id: imageId, imageCategory: "image"},
            attributes: { 
                exclude: ["updatedAt"]  ,
                include: [
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM "Comments"
                            WHERE "Comments"."imageId" = "Image"."id"
                        )`),
                        "totalComment"
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM "Comments"
                            WHERE "Comments"."imageId" = "Image"."id"
                            AND "Comments"."isReply" = false
                        )`),
                        "parentComment"
                    ]
                ]   
            },
            include: [ 
                "author", 
                "imageLikes",
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
            authorId: image.author.id,
            author: image.author.name,
            url: image.url,
            views: image.views,
            likes: image.imageLikes.length,
            commentList: [],
            tags: image.tagList,
            createdAt: image.createdAt,
            totalComment: Number(image.get("totalComment")),
            parentComment: Number(image.get("parentComment"))
        }
        res.status(200).json({state: true, data: imageFindData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {findImageById}