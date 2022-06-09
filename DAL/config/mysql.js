const mysql = require("promise-mysql");
require("dotenv").config();

const dbconf = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
};

const connection = mysql.createPool(dbconf);

const getConnection = () => {
  return connection;
};

module.exports = { getConnection };
