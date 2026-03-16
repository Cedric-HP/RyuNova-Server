const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
// Creation of the connection to the data base
const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);
module.exports = sequelize