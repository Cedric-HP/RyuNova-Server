const { Comment, User } = require("../../models");

const VALID_CONTENT_TYPES = ["image", "article"];

const createComment = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            contentId,
            contentType,
            targetCommentId = 0,
            comment,
            isReply
        } = req.body;

        const contentIdNum = Number(contentId);
        const targetCommentIdNum = Number(targetCommentId) || null;

        // VERIFICATION
        // Content ID
        if (!contentIdNum || contentIdNum < 1) {
            return res.status(400).json({
                state: false,
                error: "Invalid contentId"
            });
        }
        // Content Type
        if (!VALID_CONTENT_TYPES.includes(contentType)) {
            return res.status(400).json({
                state: false,
                error: "Invalid contentType"
            });
        }

        // IsReply
        if (isReply && (!targetCommentId || targetCommentId < 1)) {
            return res.status(400).json({
                state: false,
                error: "targetCommentId is required for replies"
            });
        }

        // isNotReply
        if (!isReply && targetCommentId > 0) {
            return res.status(400).json({
                state: false,
                error: "targetCommentId must be 0 for non-reply comments"
            });
        }

        // Parent Commment
        let parentComment = null;

        if (isReply) {
            parentComment = await Comment.findByPk(targetCommentId);

            if (!parentComment) {
                return res.status(404).json({
                    state: false,
                    error: "Parent comment not found"
                });
            }

            // Is Same Content
            if (parentComment.imageId !== contentId) {
                return res.status(400).json({
                    state: false,
                    error: "Reply does not belong to this content"
                });
            }
        }

        // CREATION
        const data = {
            userId,
            comment,
            isReply: Boolean(isReply),
            imageId: null,
            articleId: null,
            commentId: isReply ? targetCommentIdNum : null
        };

        if (contentType === "image") {
            data.imageId = contentIdNum;
        }

        if (contentType === "article") {
            data.articleId = contentIdNum;
        }

        const created = await Comment.create(data);

        // USER INFOS
        const user = await User.findByPk(userId, {
            attributes: ["id", "name", "avatarUrl"]
        });

        return res.status(201).json({
            state: true,
            data: {
                id: created.id,
                userId: user.id,
                userName: user.name,
                url: user.avatarUrl,
                comment: created.comment,
                targetCommentId: isReply ? targetCommentId : 0,
                likes: 0,
                createdAt: created.createdAt,
                hasReply: false,
                isReply: created.isReply,
                totalReply: 0
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            state: false,
            error: error.message
        });
    }
};

module.exports = { createComment };