const { Sequelize } = require("sequelize");
require("dotenv").config();

// Étape 2 : configurer la connexion Sequelize
// Création de la connexion
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
    }
);
module.exports = sequelize