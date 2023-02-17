const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./Routes/auth.Route");

const app = express();

// JSON 파싱 미들웨어 등록
app.use(express.json());
app.use(bodyParser.json());

// // Connect to MySQL
// const mysql = require("mysql2/promise");
// const pool = mysql.createPool(config);

// // Set up database
// pool
//   .execute(
//     `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     role VARCHAR(20) DEFAULT 'user',
//     isEmailConfirmed BOOLEAN DEFAULT false
//   )
// `
//   )
//   .then(() => {
//     console.log("MySQL database is ready");
//   })
//   .catch((err) => {
//     console.log("Failed to create MySQL database");
//     console.log(err);
//     process.exit(1);
//   });

// Set up routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

// Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
