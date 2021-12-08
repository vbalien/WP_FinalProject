import { Router } from "express";

const router = Router();

// 가입 요청
router.post("/register");

// 메일 인증 요청
router.post("/verify");

// 로그인 요청
router.post("/login");

// 프로필 정보 요청
router.get("/profile");

// 팔로우 목록 요청
router.get("/follow");

// 팔로우 토글 요청
router.post("/toggle_follow");

export default router;
