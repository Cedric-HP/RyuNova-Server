require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "ryunova_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "postgres",
    password: "password",
    database: "ryunova_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};





