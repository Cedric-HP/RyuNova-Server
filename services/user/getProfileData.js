const {User} = require("../../models")
const { blacklistToken } = require("../../utilitises/blacklistToken");

const getProfileData = async (req, res) =>{
    try {
        // search for the user
        const userId = parseInt(req.user.id)
        const user = await User.findOne({
            where: {id: userId},
            attributes: { 
                exclude: ['hashedPassword', "updatedAt", "role"]     
            },
            include: [ 
                {
                    association: "images",
                    attributes: ["id"],
                    where: {
                        imageCategory: "image"
                    },
                    required: false
                },
                {
                    association: "imageLiked",
                    attributes: ["id"]
                },
                {
                    association: "followers",
                    attributes: ["id"]
                },
                {
                    association: "following",
                    attributes: ["id"]
                },
                {
                    association: "commentLiked",
                    attributes: ["id"]
                },
                {
                    association: "commentPosted",
                    attributes: ["id"]
                }
            ]
        });
        if (!user) {
            try {
                const [__, accessToken] = req.headers.authorization.split(" ")
                blacklistToken(accessToken)
                return res.status(404).json({state: false, error: `User id: ${req.user.id} not found!` });
            } catch (error) {
                throw error
            } 
        }
        const followersCount = await user.countFollowers();
        const followingList = user.following.map((item)=>{
            return {id: item.id}
        })
        const userData = {
            id: user.id,
            name: user.name,
            description: user.description,
            avatarUrl: user.avatarUrl,
            bannerUrl: user.bannerUrl,
            views: 0,
            likes: 0,
            images: user.images,
            imageLiked: user.imageLiked,
            articles: [],
            articleLiked: [],
            followers: followersCount,
            following: followingList,
            commentPosted: user.commentPosted,
            commentLiked: user.commentLiked,
            createdAt: user.createdAt

        }
        res.status(200).json({state: true, data: userData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {getProfileData}

