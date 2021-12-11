import express from "express";
import errorHandler from "./error-handler";
import { router as userRouter } from "./users";
import { router as postRouter } from "./posts";
import { router as messageRouter } from "./messages";
import { router as hashtagRouter } from "./hashtags";

export const router = express
  .Router()

  // user route
  .use("/users", userRouter)

  // post route
  .use("/posts", postRouter)

  // message route
  .use("/messages", messageRouter)

  // hashtag route
  .use("/hashtags", hashtagRouter)

  .use(errorHandler);
