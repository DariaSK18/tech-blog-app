import passport from "passport";
import { findById, users } from "../models/userModel.mjs";
import AppError from "../utils/AppError.mjs";
import { Strategy as LocalStrategy } from "passport-local";
import { compareHashedPassword } from "../utils/helpers.mjs";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    if (!user) return done(new AppError("User not found", 404), null);
    done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = users.find((u) => u.username === username);
        if (!user) return done(null, false, { message: "User not found" });
        const isMatch = compareHashedPassword(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Invalid credentials" });
        done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
