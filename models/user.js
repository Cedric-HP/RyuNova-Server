const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      len: [3, 50],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [0, 255]
    },
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'redactor', 'admin']],
    },
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    defaultValue: '',
    validate: {
      len: [0, 1000]
    },
  },
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: [0, 255]
    },
  },
  bannerUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: [0, 255]
    },
  }
});

module.exports = { User };