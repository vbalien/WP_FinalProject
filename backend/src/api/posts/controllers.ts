import { Prisma } from "@prisma/client";
import express from "express";
import prisma from "../../prisma";

export async function post_get_all(
  req: express.Request,
  res: express.Response
) {
  let whereInput: Prisma.PostWhereInput = {};
  const kind = req.query.kind as string;
  const exact = req.query.exact === "true";
  const query = req.query.query as string;
  const take = Number.parseInt(req.query.take as string);
  const skip = Number.parseInt(req.query.skip as string);

  if (kind === "author") {
    whereInput = {
      author: {
        username: exact ? { equals: query } : { contains: query },
      },
    };
  } else if (kind === "hashtag") {
    whereInput = {
      hashtags: {
        some: { name: exact ? { equals: query } : { contains: query } },
      },
    };
  } else if (kind === "content") {
    whereInput = {
      content: {
        contains: query,
      },
    };
  }

  console.log(JSON.stringify(whereInput, null, 2));

  const trans = await prisma.$transaction([
    prisma.post.count({
      where: whereInput,
    }),
    prisma.post.findMany({
      take,
      skip,
      where: whereInput,
      orderBy: { createdAt: "desc" },
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
          orderBy: { createdAt: "asc" },
          select: { id: true },
        },
        hashtags: {
          select: { name: true },
        },
      },
    }),
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

  const content: string = req.body.content;
  const matches = content.match(/#\S+/g);
  const hashtags = matches ? matches.map((tagname) => tagname.slice(1)) : [];
  const hashtagsQuery = hashtags.map((name) => ({
    where: { name },
    create: { name },
  }));

  const post = await prisma.post.create({
    data: {
      author: { connect: { id: req.user!.id } },
      content,

      hashtags: {
        connectOrCreate: hashtagsQuery,
      },

      attatchments: {
        connect: images,
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
  });

  return res.json({ data: post });
}

export async function post_update(req: express.Request, res: express.Response) {
  const id = req.params.id;
  const images = (req.body.images as string[]).map((id) => ({ id }));

  if (images.length === 0) {
    throw Error("하나 이상의 이미지를 업로드해주세요.");
  }

  const content: string = req.body.content;
  const matches = content.match(/#\S+/g);
  const hashtags = matches ? matches.map((tagname) => tagname.slice(1)) : [];
  const hashtagsQuery = hashtags.map((name) => ({
    where: { name },
    create: { name },
  }));

  const [, post] = await prisma.$transaction([
    prisma.post.update({
      where: { id },
      data: {
        hashtags: {
          set: [],
        },
      },
    }),
    prisma.post.update({
      where: { id },
      data: {
        content,

        hashtags: {
          connectOrCreate: hashtagsQuery,
        },

        attatchments: {
          set: images,
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
