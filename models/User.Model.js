const mysql = require("mysql2/promise");
const config = require("../config/db.config");

// 사용자 모델
const userModel = {
  // 사용자 생성
  async createUser(NickName, Pwd, Email, Address, Role) {
    const conn = await mysql.createConnection(config);

    try {
      const [result] = await conn.query(
        "INSERT INTO users (NickName, Pwd, Email, Address,Role) VALUES (?, ?, ?, ?,?)",
        [NickName, Pwd, Email, Address, Role]
      );
      return result.insertId;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      conn.end();
    }
  },

  // 사용자 조회
  async getUserByUsername(NickName) {
    const conn = await mysql.createConnection(config);

    try {
      const [rows] = await conn.query(
        "SELECT * FROM users WHERE NickName = ?",
        [NickName]
      );
      return rows[0];
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      conn.end();
    }
  },

  // 사용자 비밀번호 검증
  async verifyPassword(Pwd, hash) {
    return bcrypt.compare(Pwd, hash);
  },
};

module.exports = userModel;
