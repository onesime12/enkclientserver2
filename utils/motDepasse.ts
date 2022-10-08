import bcrypt from "bcryptjs";

export const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePwd = async (password, hashPwd) => {
  return bcrypt.compare(password, hashPwd);
};

export default {hashedPassword, comparePwd };
