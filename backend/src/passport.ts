import { Express } from "express";
import passport from "passport";
import prisma from "./prisma";
import localStrategy from "./strategies/local-strategy";

export function configuration(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(localStrategy);

  passport.serializeUser<string>(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser<string>(async function (id, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          activated: true,
        },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
