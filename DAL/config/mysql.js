const mysql = require("promise-mysql");
require("dotenv").config();

const dbconf = {
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = mysql.createConnection(dbconf);

const getConnection = () => {
  return connection;
};

module.exports = { getConnection };
