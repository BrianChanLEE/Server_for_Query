// JWT 시크릿 키
const jwt = require("jsonwebtoken");

// JWT 시크릿 키
const JWT_SECRET = "JWT_SECRET_For_CoffeeMuller";

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  // Authorization 헤더에서 JWT 토큰을 추출
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "인증에 실패했습니다." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // JWT 토큰 검증
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "인증에 실패했습니다." });
  }
};

module.exports = {
  JWT_SECRET,
  authMiddleware,
};
