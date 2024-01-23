require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  },
  test: {
    // Test environment configuration (if needed)
  },
  production: {
    // Production environment configuration (if needed)
  },
};