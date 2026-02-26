const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Article = sequelize.define("Article", {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    defaultValue: "",
    validate: {
      len: [0, 200]
    },
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
});

module.exports = { Article };

