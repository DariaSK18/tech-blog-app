import bcrypt from "bcrypt";
import passport from "passport";

const saltRound = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, salt);
};

export const compareHashedPassword = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};
