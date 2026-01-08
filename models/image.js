const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Image = sequelize.define("Image", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      max: 1000,
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
  imageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageData: {
    type: DataTypes.BLOB('long'),
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
});

module.exports = { Image };