const {Image} = require("../../models")

const addContentView = async (req, res, type) =>{
    try {
        const contentId = req.params.contentId
        switch(type) {
            case"image":
                const image = await Image.findByPk(contentId)
                image.views = parseInt(image.views) + 1
                await image.save()
            break
            // case"article":
            //     const article = await Article.findByPk(contentId)
            //     article.views = parseInt(article.views) + 1
            //     await article.save()
            // break
        }
        res.status(200).json({state: true, message: "View Added!"});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {addContentView}

