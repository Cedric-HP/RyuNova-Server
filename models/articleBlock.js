const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ArticleBlock = sequelize.define("ArticleBlock", {
    blockType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'paragraph',
        validate: {
            isIn: [['paragraph', 'paragraphImage', 'image', 'sectionTitle']],
        },
    },
    textContent: {
        type: DataTypes.STRING(2000),
        allowNull: false,
        defaultValue: "",
        validate: {
            len: [0, 2000]
        },
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    },
    imageDescription: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        validate: {
            len: [0, 200]
        },
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = { ArticleBlock };