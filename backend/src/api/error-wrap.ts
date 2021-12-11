import express from "express";

// 에러 핸들링을 위해 catch하여 next (=args[2])호출하는 래퍼 작성
type AsyncRequestHandler = (
  ...args: Parameters<express.RequestHandler>
) => Promise<unknown>;
const errorWrap: (fn: AsyncRequestHandler) => express.RequestHandler =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

export default errorWrap;
