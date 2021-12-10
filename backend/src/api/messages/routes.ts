import { Router } from "express";
import * as controllers from "./controllers";

export const router = Router()
  // 대화방 목록 요청
  // = 서로 follow한 유저 목록
  .get("/", controllers.message_get_rooms)

  // 대화방 메시지 목록 요청
  .get("/:id", controllers.message_get_messages)

  // 대화방 메시지 전송 요청
  .post("/:id/send", controllers.message_send_message);
