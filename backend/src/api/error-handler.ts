import express from "express";

// 에러를 정해진 json 포맷으로 보내주도록 핸들링
export default function errorHandler(
  err: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.name, err.message);
  res.status(200);
  res.json({ error: err.message });
}
