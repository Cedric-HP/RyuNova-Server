const { User } = require("./user.js")
const { Image } = require("./image.js")
const { Tag } = require("./tag.js")
const { Comment } = require("./comment.js")
const { BlackListToken } = require("./blackListToken.js")
const { Article } = require("./article.js")
const { ArticleBlock} = require("./articleBlock.js")

const sequelize = require("../db");

// Relation Tables
const User_Image = sequelize.define('User_Image', {}, { timestamps: false });
const User_Article = sequelize.define('User_Article', {}, { timestamps: false });
const Tag_Image = sequelize.define('Tag_Image', {}, { timestamps: false });
const Tag_Article = sequelize.define('Tag_Article', {}, { timestamps: false });
const User_Comment= sequelize.define('User_Comment', {}, { timestamps: false });
const User_Follow= sequelize.define('User_Follow', {}, { timestamps: false });

// User Follow
User.belongsToMany(User, {through: "User_Follow", as: "following", foreignKey: "userId", otherKey: "followedId"});
User.belongsToMany(User, {through: "User_Follow", as: "followers", foreignKey: "followedId", otherKey: "userId"});

// User Image 
User.hasMany(Image, { foreignKey: "userId", as: "images"});
Image.belongsTo(User, { foreignKey: "userId", as: "author" });
User.belongsToMany(Image, {through: User_Image, foreignKey: "userLikesId", as: "imageLiked"});
Image.belongsToMany(User, {through: User_Image, foreignKey: "imageLikedId", as: "imageLikes"});

// User Article
User.hasMany(Article, { foreignKey: "userId", as: "articles"});
Article.belongsTo(User, { foreignKey: "userId", as: "author" });
User.belongsToMany(Article, {through: User_Article, foreignKey: "userLikesId", as: "articleLiked"});
Article.belongsToMany(User, {through: User_Article, foreignKey: "articleLikedId", as: "articleLikes"});


// Comment Relation
// User
User.hasMany(Comment, {foreignKey: "userId", as: "commentPosted"});
Comment.belongsTo(User, {foreignKey: "userId", as: "authorId"});

// Image
Image.hasMany(Comment, {
    foreignKey: "imageId", 
    as: "commentList",
    onDelete: "CASCADE"
});

// Article
Article.hasMany(Comment, {
    foreignKey: "articleId", 
    as: "commentList",
    onDelete: "CASCADE"
});

// Replies
Comment.hasMany(Comment, {
    foreignKey: "commentId", 
    as: "replyList",
    onDelete: "CASCADE"
});

Comment.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "parentComment"
});

// Likes
User.belongsToMany(Comment, {through: User_Comment, foreignKey: "userLikesId", as: "commentLiked"});
Comment.belongsToMany(User, {through: User_Comment, foreignKey: "commentLikedId", as: "commentLikes"});

// Tags Relation
Image.belongsToMany(Tag, {through: Tag_Image, foreignKey: "imageId", as: "tagList"});
Tag.belongsToMany(Image, {through: Tag_Image, foreignKey: "tagId", as: "imagesList"});
Article.belongsToMany(Tag, {through: Tag_Article, foreignKey: "articleId", as: "tagList"});
Tag.belongsToMany(Article, {through: Tag_Article, foreignKey: "tagId", as: "articlesList"});

// Article ArticleBlock
Article.hasMany(ArticleBlock, { foreignKey: "articleId", as: "articleBlockList", onDelete: "CASCADE"});
ArticleBlock.belongsTo(Article, { foreignKey: "articleId", as: "parentArticle" });

module.exports = {
    User,
    Image,
    Tag,
    Comment,
    BlackListToken,
    Tag_Image,
    User_Comment,
    User_Image,
    User_Follow,
    Article,
    ArticleBlock,
    User_Article,
    Tag_Article
}

