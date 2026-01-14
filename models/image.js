const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Image = sequelize.define("Image", {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: "",
    validate: {
      len: [0, 50]
    },
  },
  description: {
    type: DataTypes.STRING(2000),
    allowNull: false,
    defaultValue: '',
    validate: {
      len: [0, 2000]
    },
  },
  imageCategory: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'image',
    validate: {
      isIn: [['image', 'avatar', 'banner']],
    },
  },
  url: {
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

module.exports = { Image };