import express from "express";
import prisma from "../../prisma";

export async function hashtag_get_items(
  req: express.Request<
    { hashtag: string },
    unknown,
    unknown,
    { take: number; skip: number }
  >,
  res: express.Response
) {
  const name = req.params.hashtag;
  const take = req.query.take;
  const skip = req.query.skip;

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
    }),
  ]);

  return res.json({ data: { total: trans[0], posts: trans[1] } });
}
