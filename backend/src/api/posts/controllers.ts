import express from "express";
import prisma from "../../prisma";

export async function post_get_all(
  req: express.Request<
    unknown,
    unknown,
    unknown,
    { take: number; skip: number }
  >,
  res: express.Response
) {
  const take = req.query.take;
  const skip = req.query.skip;

  const trans = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({ take, skip }),
  ]);
  return res.json({
    data: {
      total: trans[0],
      posts: trans[1],
    },
  });
}

export async function post_add(req: express.Request, res: express.Response) {
  const images = (req.body.images as string[]).map((id) => ({ id }));

  if (images.length === 0) {
    throw Error("하나 이상의 이미지를 업로드해주세요.");
  }

  const content: string = req.body.contant;
  const matches = content.match(/#\S+/g);
  const hashtags = matches
    ? matches.map((tagname) => ({
        name: tagname,
      }))
    : [];

  const post = await prisma.post.create({
    data: {
      author: { connect: { id: req.user!.id } },
      content,

      hashtags: {
        create: hashtags,
      },

      attatchments: {
        connect: images,
      },
    },
  });

  return res.json({ data: post });
}

export async function post_get_one(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      attatchments: true,
    },
  });

  if (!post) {
    throw Error("존재하지 않는 게시글입니다.");
  }

  if (post.author.id !== req.user!.id) {
    throw Error("권한이 없습니다.");
  }

  return res.json({ data: post });
}

export async function post_update(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const images = (req.body.images as string[]).map((id) => ({ id }));

  if (images.length === 0) {
    throw Error("하나 이상의 이미지를 업로드해주세요.");
  }

  const content: string = req.body.contant;
  const matches = content.match(/#\S+/g);
  const hashtags = matches
    ? matches.map((tagname) => ({
        name: tagname,
      }))
    : [];

  const post = await prisma.post.update({
    where: { id },
    data: {
      content,

      hashtags: {
        create: hashtags,
      },

      attatchments: {
        connect: images,
      },
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw Error("존재하지 않는 게시글입니다.");
  }

  if (post.author.id !== req.user!.id) {
    throw Error("권한이 없습니다.");
  }

  return res.json({ data: post });
}

export async function post_delete(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const post = await prisma.post.delete({
    where: { id },
    include: {
      author: true,
    },
  });

  if (!post) {
    throw Error("존재하지 않는 게시글입니다.");
  }

  if (post.author.id !== req.user!.id) {
    throw Error("권한이 없습니다.");
  }

  return res.json({ data: post });
}
