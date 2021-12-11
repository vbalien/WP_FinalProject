import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import prisma from "../prisma";

export default new LocalStrategy(async function (username, password, done) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!foundUser) {
      return done(null, false, { message: "존재하지 않는 유저이름입니다." });
    }

    const { password: hashedPassword, ...user } = foundUser;
    if (!(await bcrypt.compare(password, hashedPassword))) {
      return done(null, false, { message: "패스워드가 올바르지 않습니다." });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
