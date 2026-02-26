const { Op, literal } = require("sequelize");
const { User, Image, Comment, Tag } = require("../../models");

const PAGE_SIZE = 20;

const VALID_TYPES = ["image", "article", "user"];
const VALID_SORTS = ["view", "like", "date", "follow"];
const VALID_ORDER = ["ASC", "DESC"]

const searchContent = async (req, res) => {
    try {
    
        // Standardization of parameters
        let {
            search = "",
            type = "image",
            sort = "view",
            tag,
            user,
            page = 0,
            order = "DESC"
        } = req.query;

        if (!VALID_TYPES.includes(type)) type = "image";
        if (sort === "follower") sort = "follow";
        if (!VALID_SORTS.includes(sort)) sort = "view";
        if (!VALID_ORDER.includes(order)) order = "DESC";

        page = Number(page) - 1;
        if (isNaN(page) || page < 1) page = 0;

        user = Number(user);
        if (isNaN(user) || user < 1) user = undefined;

        const limit = PAGE_SIZE;
        const offset = page * PAGE_SIZE;

        // Multiple Tags
        const tags =
            typeof tag === "string" && tag.length
                ? tag.split("_").filter(Boolean)
                : [];

    
        // Articles (not implemented)
        if (type === "article") {
            return res.status(200).json({
                state: true,
                page,
                pageSize: PAGE_SIZE,
                totalResults: 0,
                totalPages: 0,
                results: {
                    image: [],
                    user: [],
                    article: []
                },
            });
        }

        // Image
        if (type === "image") {
            const where = {
            imageCategory: "image",
                ...(search && {
                    [Op.or]: [
                        { title: { [Op.iLike]: `%${search}%` } },
                        { description: { [Op.iLike]: `%${search}%` } },
                    ],
                }),
                ...(user && { userId: user }),
                ...(tags.length && {
                    id: {
                        [Op.in]: literal(`(
                            SELECT "Tag_Images"."imageId"
                            FROM "Tag_Images"
                            JOIN "Tags"
                                ON "Tags"."id" = "Tag_Images"."tagId"
                            WHERE "Tags"."name" IN (${tags
                            .map((t) => `'${t.replace(/'/g, "''")}'`)
                            .join(",")})
                            GROUP BY "Tag_Images"."imageId"
                            HAVING COUNT(DISTINCT "Tags"."name") = ${tags.length}
                        )`),
                    },
                }),
            };

            const orderMap = {
                view: [["views", order]],
                like: [[literal('"likes"'), order]],
                date: [["createdAt", order]],
            };

            const { rows, count } = await Image.findAndCountAll({
                where,
                limit,
                offset,
                distinct: true,
                order: orderMap[sort] || orderMap.view,
                include: [
                    { model: User, as: "author", attributes: ["id", "name"] },
                    { model: Comment, as: "commentList", attributes: ["id"] },
                    {
                        model: Tag,
                        as: "tagList",
                        attributes: ["name"],
                        through: { attributes: [] },
                    },
                ],
                attributes: {
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM "User_Images"
                                WHERE "User_Images"."imageLikedId" = "Image"."id"
                            )`),
                            "likes",
                        ],
                    ],
                 },
            });

            return res.status(200).json({
                state: true,
                page,
                pageSize: PAGE_SIZE,
                totalResults: count,
                totalPages: Math.ceil(count / PAGE_SIZE),
                results: {
                    user: [],
                    article: [],
                    image: rows.map((img) => ({
                        id: img.id,
                        title: img.title,
                        author: img.author.name,
                        authorId: img.author.id,
                        description: img.description,
                        url: img.url,
                        views: img.views,
                        likes: Number(img.get("likes")),
                        createdAt: img.createdAt,
                        commentList: img.commentList,
                        tags: img.tagList,
                    }))
                }
             });
        }

        // User
        if (type === "user") {
            const where = search
                ? { name: { [Op.iLike]: `%${search}%` } }
                : {};

            const orderMap = {
                follow: [[literal(`(
                    SELECT COUNT(*)
                    FROM "User_Follows"
                    WHERE "User_Follows"."followedId" = "User"."id"
                    )`),
                    order
                ]],
                like: [[literal('"likes"'), order]],
                view: [[literal('"views"'), order]],
                date: [["createdAt", order]],
            };

            const { rows, count } = await User.findAndCountAll({
                where,
                limit,
                offset,
                distinct: true,
                order: orderMap[sort] || orderMap.view,
                attributes: {
                    include: [
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM "Images"
                                WHERE "Images"."userId" = "User"."id"
                                AND "Images"."imageCategory" = 'image'
                            )`),
                            "images",
                        ],
                        [
                            literal(`(
                                SELECT COUNT(*)
                                FROM "User_Follows"
                                WHERE "User_Follows"."followedId" = "User"."id"
                            )`),
                            "followers",
                        ],
                        [
                            literal(`(
                                SELECT COALESCE(SUM("views"), 0)
                                FROM "Images"
                                WHERE "Images"."userId" = "User"."id"
                                AND "Images"."imageCategory" = 'image'
                            )`),
                            "views",
                        ],
                        [
                            literal(`(
                                (
                                    SELECT COUNT(*)
                                    FROM "User_Images"
                                    JOIN "Images"
                                        ON "Images"."id" = "User_Images"."imageLikedId"
                                    WHERE "Images"."userId" = "User"."id"
                                    AND "Images"."imageCategory" = 'image'
                                ) +
                                (
                                    SELECT COUNT(*)
                                    FROM "User_Comments"
                                    JOIN "Comments"
                                        ON "Comments"."id" = "User_Comments"."commentLikedId"
                                    WHERE "Comments"."userId" = "User"."id"
                                )
                            )`),
                            "likes",
                        ],
                    ],
                },      
            });

            return res.status(200).json({
                state: true,
                page,
                pageSize: PAGE_SIZE,
                totalResults: count,
                totalPages: Math.ceil(count / PAGE_SIZE),
                results: {
                    image: [],
                    article: [],
                    user: rows.map((u) => ({
                        id: u.id,
                        name: u.name,
                        description: u.description,
                        avatarUrl: u.avatarUrl,
                        bannerUrl: u.bannerUrl,
                        views: Number(u.get("views")),
                        likes: Number(u.get("likes")),
                        images: Number(u.get("images")),
                        articles: 0,
                        followers: Number(u.get("followers")),
                        createdAt: u.createdAt,
                    }))
                }
            });
        }
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
    }
}

module.exports = {searchContent}