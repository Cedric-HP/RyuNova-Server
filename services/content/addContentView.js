const {Image, Comment} = require("../../models")

const addContentView = async (req, res, type) =>{
    try {
        const contentId = req.params.contentId
        switch(type) {
            case"image":
                const image = await Image.findByPk(contentId)
                image.views = parseInt(image.views) + 1
                await image.save()
            break
            case"comment":
                const comment = await Comment.findByPk(contentId)
                comment.views = parseInt(comment.views) + 1
                await comment.save()
            break
        }
        res.status(200).json({state: true, message: "View Added!"});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {addContentView}

