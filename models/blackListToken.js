const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const BlackListToken = sequelize.define("BlackListToke", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = { BlackListToken };