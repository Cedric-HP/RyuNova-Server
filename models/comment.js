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
  }
});

module.exports = { Comment };