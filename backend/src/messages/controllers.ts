import { Router } from "express";

const router = Router();

// 대화방 목록 요청
// = 서로 follow한 유저 목록
router.get("/room");

// 대화방 메시지 목록 요청
router.get("/room/:id");

// 대화방 메시지 전송 요청
router.post("/room/:id/send");

export default router;
