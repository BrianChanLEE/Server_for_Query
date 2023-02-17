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

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { createUser, findUserByEmail } = require("../models/User.Model");
// const config = require("../config/db.config");
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "brianlee1914@gmail.com",
//     pass: "Apple2019!!!",
//   },
// });

// module.exports = {
//   //회원가입
//   async signup(req, res) {
//     const { NickName, Pwd, Email, Address } = req.body;

//     // 이메일이 이미 존재하는지 확인
//     const user = await findUserByEmail(Email);
//     if (user) {
//       return res.status(409).json({ error: "이미 사용되고있는 이메일" });
//     }
//     // 비밀번호 해시
//     const salt = await bcrypt.genSalt(10);
//     const hashedPwd = await bcrypt.hash(Pwd, salt);

//     // 유저 생성
//     const createUser = await createUser(NickName, Pwd, hashedPwd, Address);

//     // 인증 이메일 보내기
//     const token = jwt.sign({ Email: createdUser.email }, config.jwtSecret);
//     const mailOptions = {
//       from: "brianlee1914@gmail.com",
//       to: createdUser.email,
//       subject: "당신의 이메일 주소를 인증 해주세요",
//       text: `이메일 주소를 인증하려면 다음 링크를 클릭하십시오: ${config.appUrl}/api/auth/confirm-email?token=${token}`,
//     };
//     try {
//       await transporter.sendMail(mailOptions);
//     } catch (error) {
//       console.log("sendMail error :", error);
//       return res.status(500).json({ error: "이메일 인증 실패" });
//     }

//     // 성공적으로 인증시
//     res.status(201).json({ success: true });
//   },

//   //로그인
//   async login(req, res) {
//     const { Email, Pwd } = req.body;

//     // 이메일로 사용자 찾기
//     const user = await findUserByEmail(Email);
//     if (!user) {
//       return res.status(401).json({ error: "잘못된 이메일 또는 비밀번호" });
//     }

//     //비밀번호 비교
//     const isPwdValid = await bcrypt.compare(Pwd, user.Pwd);
//     if (!isPwdValid) {
//       return res.status(401).json({ error: "잘못된 이메일 또는 비밀번호" });
//     }

//     // 토큰 생성
//     const token = jwt.sign(
//       { id: user.id, Email: user.Email, Role: user.Role },
//       config.jwtSecret,
//       { expiresIn: "1h" }
//     );

//     //토큰으로 응답
//     res.json({ token });
//   },

//   async confirmEmail(req, res) {
//     const { token } = req.query;
//     try {
//       const { Email } = jwt.verify(token.config.jwtSecret);
//       const user = await findUserByEmail(Email);

//       if (!user) {
//         return res.status(404).json({ error: "사용자를 찾지 못했습니다." });
//       }
//       await updateUser(user.id, { isEmailConfirmed: true });

//       res.redirect(config.appUrl);
//     } catch (err) {
//       console.log("confirmEmail Err :", err);
//       res.status(400).json({ error: "잘못된 토큰" });
//     }
//   },
// };
