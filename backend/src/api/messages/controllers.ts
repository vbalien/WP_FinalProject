import express from "express";
import prisma from "../../prisma";

export async function message_get_rooms(
  req: express.Request,
  res: express.Response
) {
  // 맞팔 유저 가져옴
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          following: {
            some: { id: req.user!.id },
          },
        },
        {
          followedBy: {
            some: { id: req.user!.id },
          },
        },
      ],
    },
  });

  return res.json({
    data: users,
  });
}

export async function message_get_messages(
  req: express.Request,
  res: express.Response
) {
  const take = req.params.take
    ? Number.parseInt(req.params.take as string)
    : undefined;
  const targetUserId = req.params.userId;
  const messages = await prisma.message.findMany({
    take,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        { toId: req.user!.id, fromId: targetUserId },
        { toId: targetUserId, fromId: req.user!.id },
      ],
    },
  });

  return res.json({
    data: messages,
  });
}

export async function message_send_message(
  req: express.Request,
  res: express.Response
) {
  const targetUserId = req.params.userId;
  const message = await prisma.message.create({
    data: {
      fromId: req.user!.id,
      toId: targetUserId,
      text: req.body.text,
    },
  });

  return res.json({
    data: message,
  });
}
