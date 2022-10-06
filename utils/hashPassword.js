const bcrypt = require("bcryptjs");
const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePwd = async (password, hashPwd) => {
  return bcrypt.compare(password, hashPwd);
};

module.exports = { hashedPassword, comparePwd };
