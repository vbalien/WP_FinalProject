import express from "express";

// 에러 핸들링을 위해 catch하여 next (=args[2])호출하는 래퍼 작성
type AsyncRequestHandler = (...args: any[]) => Promise<unknown> | unknown;
const errorWrap: (fn: AsyncRequestHandler) => express.RequestHandler =
  (fn) =>
  (...args) => {
    const res = fn(...args);
    if (res instanceof Promise) {
      return res.catch(args[2]);
    }
    return res;
  };

export default errorWrap;
