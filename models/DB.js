const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const pool = mysql.createPool(dbConfig);

pool.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = pool;
