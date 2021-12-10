import { Router } from "express";
import * as controllers from "./controllers";

export const router = Router()
  // 가입 요청
  .post("/register", controllers.user_register)

  // 메일 인증 요청
  .post("/verify", controllers.user_verify)

  // 메일 인증키 전송 요청
  .post("/verify/send", controllers.user_verify_send)

  // 로그인 요청
  .post("/login", controllers.user_login)

  // 프로필 정보 요청
  .get("/profile", controllers.user_profile)

  // 팔로우 목록 요청
  .get("/follow", controllers.user_follow)

  // 팔로우 토글 요청
  .post("/follow_toggle", controllers.user_follow_toggle);
