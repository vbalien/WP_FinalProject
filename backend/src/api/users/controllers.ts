import express from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import prisma from "../../prisma";
import passport from "passport";
import { sendVerifyMail } from "../../utils";

export async function user_register(
  req: express.Request,
  res: express.Response
) {
  // validation 체크
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw Error(errors.array()[0].msg);
  }

  const reqData = req.body;

  const hasUsername = await prisma.user.findUnique({
    where: {
      username: reqData.username,
    },
  });

  const hasEmail = await prisma.user.findUnique({
    where: {
      email: reqData.email,
    },
  });

  if (hasUsername) {
    throw Error("이미 등록된 유저이름입니다.");
  }
  if (hasEmail) {
    throw Error("이미 등록된 이메일입니다.");
  }

  // db에 user 등록
  const user = await prisma.user.create({
    data: {
      name: reqData.name,
      username: reqData.username,
      email: reqData.email,
      password: await bcrypt.hash(reqData.password, 8),
    },
    select: {
      name: true,
      username: true,
      email: true,
    },
  });

  return res.json({
    data: user,
  });
}

export async function user_verify(req: express.Request, res: express.Response) {
  const tokenData = await prisma.userVerifyToken.findFirst({
    where: {
      userId: req.user!.id,
      token: req.body.token as string,
    },
  });

  if (!tokenData) {
    throw Error("인증 실패");
  }

  if (tokenData.expiresIn.getTime() < new Date().getTime()) {
    throw Error("유효기간이 지난 토큰입니다.");
  }

  const user = await prisma.user.update({
    where: {
      id: req.user!.id,
    },
    data: {
      activated: true,
    },
  });

  return res.json({
    data: user,
  });
}

export async function user_verify_send(
  req: express.Request,
  res: express.Response
) {
  const token = Math.random().toString(36).slice(2, 7);
  const now = new Date();
  const expiresIn = new Date(now.getTime() + 3 * 60000).toISOString();
  const tokenData = await prisma.userVerifyToken.create({
    data: {
      token,
      expiresIn: expiresIn,
      userId: req.user!.id,
    },
  });

  await sendVerifyMail(req.user!.email, tokenData.token);

  return res.json({ data: "ok" });
}

export function user_login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      throw Error(info.message);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.json({
        data: user,
      });
    });
  })(req, res, next);
}

export function user_logout(req: express.Request, res: express.Response) {
  req.logout();
  return res.json({ data: "ok" });
}

export async function user_profile(
  req: express.Request,
  res: express.Response
) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user!.id,
    },
    select: {
      username: true,
      _count: {
        select: {
          following: true,
          followedBy: true,
        },
      },
    },
  });

  return res.json({
    data: user,
  });
}

export async function user_following(
  req: express.Request,
  res: express.Response
) {
  const users = await prisma.user.findMany({
    where: {
      followedBy: {
        some: {
          id: req.user!.id,
        },
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
  return res.json({ data: users });
}

export async function user_get_all(
  _req: express.Request,
  res: express.Response
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
  return res.json({ data: users });
}

export async function user_follow_toggle(
  req: express.Request,
  res: express.Response
) {
  const targetUsername = req.body.username;
  const targetUser = await prisma.user.findFirst({
    where: {
      username: targetUsername,
      activated: true,
    },
  });

  if (!targetUser) {
    throw Error("존재하지 않는 유저입니다.");
  }

  // 팔로우중 여부 체크
  const isFollowed = await prisma.user.findFirst({
    where: {
      id: req.user!.id,
      following: {
        some: {
          id: targetUser.id,
        },
      },
    },
  });

  // 팔로우 토글
  const resultUser = await prisma.user.update({
    where: {
      id: req.user!.id,
    },
    data: {
      following: isFollowed
        ? {
            disconnect: {
              id: targetUser.id,
            },
          }
        : {
            connect: {
              id: targetUser.id,
            },
          },
    },
  });
  return res.json({ data: resultUser });
}
