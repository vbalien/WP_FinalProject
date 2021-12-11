import express from "express";
import prisma from "../../prisma";

export async function hashtag_get_items(
  req: express.Request,
  res: express.Response
) {
  const name = req.params.hashtag;

  const posts = await prisma.post.findMany({
    where: {
      hashtags: {
        some: {
          name,
        },
      },
    },
  });
  return { data: posts };
}
