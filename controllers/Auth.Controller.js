const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/User.Model");
const JWT_SECRET = require("../middlewares/authMiddleware");
const { getAddress } = require("../Util/Address");

// 회원가입
const register = async (req, res) => {
  const { NickName, Pwd, Email, Address, Role } = req.body;

  // 주소 검색
  const result = await getAddress(Address);
  if (!result) {
    return res.status(400).json({ message: "주소를 찾을 수 없습니다." });
  }

  // 비밀번호 암호화
  const hash = await bcrypt.hash(Pwd, 10);

  // 사용자 생성
  const userId = await userModel.createUser(
    NickName,
    Pwd,
    Email,
    Role,
    result.Address
  );
  if (!userId) {
    return res.status(500).json({ message: "사용자 생성에 실패했습니다." });
  }

  res.status(201).json({ message: "사용자 생성에 성공했습니다." });
};

// 로그인
const login = async (req, res) => {
  const { NickName, Pwd } = req.body;

  // 사용자 조회
  const user = await userModel.getUserByUsername(NickName);
  if (!user) {
    return res.status(401).json({ message: "사용자가 존재하지 않습니다." });
  }

  // 비밀번호 검증
  const validPassword = await userModel.verifyPassword(Pwd, user.Pwd);
  if (!validPassword) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  // JWT 토큰 생성
  const token = jwt.sign({ sub: user.Id, role: user.Role }, JWT_SECRET);

  res.json({ message: "로그인에 성공했습니다.", token });
};

// 로그아웃
const logout = async (req, res) => {
  res.json({ message: "로그아웃에 성공했습니다." });
};

module.exports = {
  register,
  login,
  logout,
};
