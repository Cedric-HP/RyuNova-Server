const { Op, literal } = require("sequelize");
const { Comment, User } = require("../../models");

const PAGE_SIZE = 20;
const VALID_TYPES = ["image", "article", "comment"];
const VALID_SORTS = ["date", "like"];

const searchComment = async (req, res) => {
    try {
        let {
            id,
            type = "image",
            sort = "date",
            limit = 1
        } = req.query;

        id = Number(id);
        limit = Number(limit);

        if (!VALID_TYPES.includes(type)) type = "image";
        if (!VALID_SORTS.includes(sort)) sort = "date";
        if (isNaN(id) || id < 1) {
            return res.status(400).json({ state: false, error: "Invalid id" });
        }
        if (isNaN(limit) || limit < 1) limit = 1;

        const limitSize = PAGE_SIZE;
        const offset = (limit -1) * PAGE_SIZE;

        //ARTICLE (not yet implemented)
        if (type === "article") {
            return res.status(200).json({
                state: true,
                page: 0,
                pageSize,
                totalcomments: 0,
                results: []
            });
        }

    
        // CONDITIONS
        let where = { isReply: false };

        if (type === "image") {
            where.imageId = id;
        }

        if (type === "comment") {
            where = {
                isReply: true,
                commentId: id
            };
        }

        // SORT
        const orderMap = {
            date: [["createdAt", "DESC"]],
            like: [[
                literal(`(
                    SELECT COUNT(*)
                    FROM "User_Comments"
                    WHERE "User_Comments"."commentLikedId" = "Comment"."id"
                )`),
                "DESC"
            ]]
        };

        // TOTAL COUNT
        const totalcomments = await Comment.count({ where });

        // MAIN QUERY
        const comments = await Comment.findAll({
            where,
            limit: limitSize,
            offset,
            order: orderMap[sort],
            include: [
                {
                    model: User,
                    as: "authorId",
                    attributes: ["id", "name", "avatarUrl"]
                }
            ],
            attributes: {
                include: [
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM "User_Comments"
                            WHERE "User_Comments"."commentLikedId" = "Comment"."id"
                        )`),
                        "likes"
                    ],
                    [
                        literal(`(
                            SELECT COUNT(*)
                            FROM "Comments" c1
                            WHERE c1."commentId" = "Comment"."id"
                        )`),
                        "parentReply"
                    ],
                    [
                        literal(`(
                            WITH RECURSIVE replies AS (
                                SELECT id
                                FROM "Comments"
                                WHERE "commentId" = "Comment"."id"
                                UNION ALL
                                SELECT c.id
                                FROM "Comments" c
                                INNER JOIN replies r ON c."commentId" = r.id
                            )
                            SELECT COUNT(*) FROM replies
                        )`),
                        "totalReply"
                    ]
                ]
            }
        });

        // FRONT-END FORMAT 
        const results = comments.map(c => ({
            id: c.id,
            userId: c.authorId.id,
            userName: c.authorId.name,
            url: c.authorId.avatarUrl,
            comment: c.comment,
            targetCommentId: c.isReply ? c.commentId : 0,
            likes: Number(c.get("likes")),
            createdAt: c.createdAt,
            isReply: c.isReply,
            parentReply: Number(c.get("parentReply")),
            totalReply: Number(c.get("totalReply"))
        }));

        return res.status(200).json({
            state: true,
            page: 0,
            pageSize: PAGE_SIZE,
            totalcomments,
            results
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ state: false, error: error.message });
    }
};

module.exports = { searchComment };




    