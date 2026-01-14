const e = require("cors");
const {User} = require("../../models")

const follow = async (req, res) =>{
    try {
        const targetUserId = parseInt(req.params.userId, 10)
        const currentUserId = req.user.id

        if (targetUserId === currentUserId) {
            return res.status(400).json({ state: false, error: "You cannot follow yourself"});
        }

        const targetUser = await User.findByPk(targetUserId)
        if (!targetUser) {
            return res.status(404).json({state: false, error: `User id: ${targetUserId} not found!` });
        }

        const currentUser = await User.findByPk(currentUserId)
        const isFollowing = await currentUser.hasFollowing(targetUser)

        let message = ""

        if (isFollowing) {
            // UNFOLLOW
            await currentUser.removeFollowing(targetUser)
            message = "User unfollowed"
        } 
        else {
            // FOLLOW
            await currentUser.addFollowing(targetUser)
            message = "User followed"
        }
        const following = await currentUser.getFollowing({
            attributes: ["id"],
        });
        const followingList = following.map((item)=>{
            return {id: item.id}
        })
        res.status(200).json({state: true, data: {following: followingList },message: message});
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {follow}

