const {User} = require("../../models")

const getProfileData = async (req, res) =>{
    try {
        // Chercher l'utilisateur
        const user = await User.findOne({
            where: {id: req.user.id},
            attributes: { 
                exclude: ['hashedPassword', "updatedAt", "followedId", "followersId", "role"]     
            },
            include: [ "images", "imageLiked", "followers", "followed", "commentLiked", "commentPosted"]
        });
        if (!user) {
            const {__, accessToken} = req.headers.authorization.split(" ")
            blacklistToken(accessToken)
            return res.status(404).json({state: false, error: `User id: ${req.user.id} not found!` });
        }
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
            followers: user.followers.length,
            followed: user.followed,
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