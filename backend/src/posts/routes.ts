import { Router } from "express";

const router = Router();

// 모든 게시글 요청
router.get("/");

// 새 게시물 작성
router.post("/");

// 하나의 게시글 요청
router.get("/:id");

// 게시글 수정 요청
router.put("/:id");

// 게시글 좋아요 토글 요청
router.post("/:id/toggle_like");

// 게시글 삭제 요청
router.delete("/:id");

export default router;
