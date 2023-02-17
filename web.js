const express = require("express");
const authRoutes = require("./Routes/auth.Route");

const app = express();

// JSON 파싱 미들웨어 등록
app.use(express.json());

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
