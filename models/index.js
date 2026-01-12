const { User } = require("./user.js")
const { Image } = require("./image.js")
const { Tag } = require("./tag.js")
const { Comment } = require("./comment.js")
const {BlackListToken} = require("./blackListToken.js")
const sequelize = require("../db");

const User_Image = sequelize.define('User_Image', {}, { timestamps: false });
const Tag_Image = sequelize.define('Tag_Image', {}, { timestamps: false });
const User_Comment= sequelize.define('User_Comment', {}, { timestamps: false });

User.hasMany(User, {foreignKey: "followedId", as: "followers"});
User.hasMany(User, {foreignKey: "followersId", as: "followed"});

User.hasMany(Image, { foreignKey: "userId", as: "images"});
Image.belongsTo(User, { foreignKey: "userId", as: "author" });
User.belongsToMany(Image, {through: User_Image, foreignKey: "userLikesId", as: "imageLiked"});
Image.belongsToMany(User, {through: User_Image, foreignKey: "imageLikedId", as: "imageLikes"});

User.hasMany(Comment, {foreignKey: "userId", as: "commentPosted"});
Comment.belongsTo(User, {foreignKey: "userId", as: "authorId"});
Image.hasMany(Comment, {foreignKey: "imageId", as: "commentList"});
Comment.hasMany(Comment, {foreignKey: "commentId", as: "replyList"});
User.belongsToMany(Comment, {through: User_Comment, foreignKey: "userLikesId", as: "commentLiked"});
Comment.belongsToMany(User, {through: User_Comment, foreignKey: "commentLikedId", as: "commentLikes"});

Image.belongsToMany(Tag, {through: Tag_Image, foreignKey: "imageId", as: "tagList"});
Tag.belongsToMany(Image, {through: Tag_Image, foreignKey: "tagId", as: "imagesList"});

module.exports = {
    User,
    Image,
    Tag,
    Comment,
    BlackListToken,
    Tag_Image,
    User_Comment,
    User_Image
}