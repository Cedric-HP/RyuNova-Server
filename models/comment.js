const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    validate: {
      len: [1, 1000],
    },
  },
  isReply: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  articleId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  validate: {
    validTarget() {

      const hasImage = this.imageId !== null;
      const hasArticle = this.articleId !== null;
      const hasComment = this.commentId !== null;

      // Must target exactly one main content (image XOR article)
      if ((hasImage && hasArticle) || (!hasImage && !hasArticle)) {
        throw new Error(
          "Comment must target either an image OR an article"
        );
      }

      // reply logic
      if (hasComment && !this.isReply) {
        throw new Error("Reply must have isReply = true");
      }

      if (!hasComment && this.isReply) {
        throw new Error("Non-reply comment cannot have isReply = true");
      }
    }
  }
});

module.exports = { Comment };

