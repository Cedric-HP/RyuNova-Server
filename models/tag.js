const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Tag = sequelize.define("Tag", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  }
});

module.exports = { Tag };