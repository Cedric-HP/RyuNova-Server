const {User} = require("../../models")

const findUserById = async (req, res) =>{
    try {
        const userId = parseInt(req.params.userId)

        // Finding the user by Id
        const user = await User.findOne({
            where: {id: userId},
            attributes: { 
                exclude: ['hashedPassword', "updatedAt", "role"]     
            },
            include: [ "images", "followers"]
        });
        // If user doesn't exit, return code 404 is not found
        if (!user) {
            return res.status(404).json({state: false, error: `User id: ${userId} not found!` });
        }
        const userData = {
            id: user.id,
            name: user.name,
            description: user.description,
            avatarUrl: user.avatarUrl,
            bannerUrl: user.bannerUrl,
            views: 0,
            likes: 0,
            images: user.images.length,
            articles: 0,
            followers: user.followers.length,
            createdAt: user.createdAt
        }
        res.status(200).json({state: true, data: userData});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {findUserById}