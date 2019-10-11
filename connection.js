const mysql = require("mysql");
require("dotenv").config();
// An object with variable named connection containing secured information transfered to the ".env" file.

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// making sure the connection of the DB successfully happened.

connection.connect(err => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection