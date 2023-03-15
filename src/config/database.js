require("dotenv").config();
module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  define: {
    timestamp: true,
    underscored: true,
  },

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};
