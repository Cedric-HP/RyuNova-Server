const { User_Image, User_Comment, // User_Article (plus tard)
    Image, Comment } = require("../../models");
const VALID_TYPES = ["image", "comment", "article"];

const toggleLike = async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const { id, type } = req.body;

        const targetContentId = Number(id);

        if (!VALID_TYPES.includes(type)) {
            return res.status(400).json({ state: false, error: "Invalid type" });
        }

        if (isNaN(targetContentId) || targetContentId < 1) {
            return res.status(400).json({ state: false, error: "Invalid id" });
        }

        let method = "add";

        // IMAGE LIKE
        if (type === "image") {
            const image = await Image.findByPk(targetContentId);
            if (!image) {
                return res.status(404).json({ state: false, error: "Image not found" });
            }

            const alreadyLiked = await image.hasImageLikes(userId);

            if (alreadyLiked) {
                await image.removeImageLikes(userId);
                method = "remove";
            } else {
                await image.addImageLikes(userId);
            }
        }

        // COMMENT LIKE
        if (type === "comment") {
            const comment = await Comment.findByPk(targetContentId);
            if (!comment) {
                return res.status(404).json({ state: false, error: "Comment not found" });
            }

            const alreadyLiked = await comment.hasCommentLikes(userId);

            if (alreadyLiked) {
                await comment.removeCommentLikes(userId);
                method = "remove";
            } else {
                await comment.addCommentLikes(userId);
            }
        }

        // ARTICLE LIKE (anticipé)
        if (type === "article") {
            method = "add";
        }

        return res.status(200).json({
            state: true,
            method,
            type,
            targetContentId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ state: false, error: error.message });
    }
};

module.exports = { toggleLike };


