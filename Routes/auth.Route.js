const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/Auth.Controller");
const authMiddleware = require("../middlewares/authMiddleware");

// 회원가입
router.post("/register", register);

// 로그인
router.post("/login", login);

// 로그아웃
router.post("/logout", authMiddleware, logout);

module.exports = router;
