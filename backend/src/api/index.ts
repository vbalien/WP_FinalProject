import express from "express";
import { router as userRouter } from "./users";
import { router as postRouter } from "./posts";
import { router as messageRouter } from "./messages";

export const router = express
  .Router()

  // user route
  .use("/users", userRouter)

  // post route
  .use("/posts", postRouter)

  // message route
  .use("/messages", messageRouter);
