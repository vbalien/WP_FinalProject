import express from "express";
import path from "path";
import prisma from "../../prisma";

export async function attatchment_upload(
  req: express.Request,
  res: express.Response
) {
  const file = req.file;

  if (!file) {
    throw Error("파일을 첨부해주세요.");
  }

  const attatchment = await prisma.attatchment.create({
    data: {
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
    },
    select: { id: true },
  });
  return res.json({ data: attatchment });
}

export async function attatchment_get(
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id;
  const attatchment = await prisma.attatchment.findUnique({
    where: { id },
  });

  if (!attatchment) {
    throw Error("파일이 존재하지 않습니다.");
  }

  res.contentType(attatchment.mimetype);
  return res.sendFile(
    path.join(__dirname, "../../../uploads", attatchment.filename)
  );
}
