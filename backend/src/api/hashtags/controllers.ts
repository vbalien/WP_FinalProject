import express from "express";
import prisma from "../../prisma";

export async function hashtag_get_items(
  req: express.Request,
  res: express.Response
) {
  const name = req.params.hashtag;
  const take = Number.parseInt(req.query.take as string);
  const skip = Number.parseInt(req.query.skip as string);

  const trans = await prisma.$transaction([
    prisma.post.count({
      take,
      skip,
      where: {
        hashtags: {
          some: {
            name,
          },
        },
      },
    }),
    prisma.post.findMany({
      where: {
        hashtags: {
          some: {
            name,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            activated: true,
          },
        },
        attatchments: {
          select: { id: true },
        },
        hashtags: {
          select: { name: true },
        },
      },
    }),
  ]);

  return res.json({ data: { total: trans[0], posts: trans[1] } });
}
