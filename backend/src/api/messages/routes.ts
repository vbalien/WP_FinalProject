import { Router } from "express";
import userGuard from "../../guards/user-guard";
import errorWrap from "../error-wrap";
import * as controllers from "./controllers";

export const router = Router()
  // 대화방 목록 요청
  // = 서로 follow한 유저 목록
  .get("/", userGuard("ACTIVATED"), errorWrap(controllers.message_get_rooms))

  // 대화방 메시지 목록 요청
  .get("/:userId", errorWrap(controllers.message_get_messages))

  // 대화방 메시지 전송 요청
  .post("/:userId/send", errorWrap(controllers.message_send_message));
