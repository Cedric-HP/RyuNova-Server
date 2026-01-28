const {User} = require("../../models")
const { literal } = require("sequelize");
const { blacklistToken } = require("../../utilitises/blacklistToken");

const getProfileData = async (req, res) =>{
    try {
        // search for the user
        const userId = Number(req.user.id);

        const user = await User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ["hashedPassword", "updatedAt", "role"],
                include: [
                    // TOTAL VIEWS (images only)
                    [
                        literal(`(
                            SELECT COALESCE(SUM("views"), 0)
                            FROM "Images"
                            WHERE "Images"."userId" = "User"."id"
                            AND "Images"."imageCategory" = 'image'
                        )`),
                        "views"
                    ],

                    // TOTAL LIKES (images + comments)
                    [
                        literal(`(
                            (
                                SELECT COUNT(*)
                                FROM "User_Images"
                                JOIN "Images"
                                    ON "Images"."id" = "User_Images"."imageLikedId"
                                WHERE "Images"."userId" = "User"."id"
                                AND "Images"."imageCategory" = 'image'
                            )
                            +
                            (
                                SELECT COUNT(*)
                                FROM "User_Comments"
                                JOIN "Comments"
                                    ON "Comments"."id" = "User_Comments"."commentLikedId"
                                WHERE "Comments"."userId" = "User"."id"
                            )
                        )`),
                        "likes"
                    ]
                ]
            },
            include: [
                {
                    association: "images",
                    attributes: ["id"],
                    where: { imageCategory: "image" },
                    required: false
                },
                {
                    association: "imageLiked",
                    attributes: ["id"],
                    through: { attributes: [] }
                },
                {
                    association: "followers",
                    attributes: ["id"],
                    through: { attributes: [] }
                },
                {
                    association: "following",
                    attributes: ["id"],
                    through: { attributes: [] }
                },
                {
                    association: "commentLiked",
                    attributes: ["id"],
                    through: { attributes: [] }
                },
                {
                    association: "commentPosted",
                    attributes: ["id"]
                }
            ]
        });

        if (!user) {
            try {
                const [, accessToken] = req.headers.authorization.split(" ");
                blacklistToken(accessToken);
            } catch (_) {}

            return res.status(404).json({
                state: false,
                authorized: false,
                error: `User id: ${userId} not found`
            });
        }

        // Format
        const userData = {
            id: user.id,
            name: user.name,
            description: user.description,
            avatarUrl: user.avatarUrl,
            bannerUrl: user.bannerUrl,

            views: Number(user.get("views")),
            likes: Number(user.get("likes")),

            images: user.images.map(i => i.id),
            imageLiked: user.imageLiked.map(i => i.id),

            articles: [],        // futur
            articleLiked: [],    // futur

            followers: await user.countFollowers(),
            following: user.following.map(u => u.id),

            commentPosted: user.commentPosted.map(c => c.id),
            commentLiked: user.commentLiked.map(c => c.id),

            createdAt: user.createdAt
        };
        res.status(200).json({state: true, data: userData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {getProfileData}


