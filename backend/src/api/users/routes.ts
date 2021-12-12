import { Router } from "express";
import { body } from "express-validator";
import userGuard from "../../guards/user-guard";
import errorWrap from "../error-wrap";
import * as controllers from "./controllers";

export const router = Router()
  // 모든 유저 목록
  .get("/", userGuard("LOGGED_IN"), errorWrap(controllers.user_get_all))

  // 가입 요청
  .post(
    "/register",
    userGuard("LOGGED_OUT"),

    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("이름은 3글자 이상이어야 합니다."),

    body("username")
      .trim()
      .isAlphanumeric()
      .withMessage("유저ID는 알파벳과 숫자로 구성되어야 합니다.")
      .isLength({ min: 5 })
      .withMessage("유저ID는 5글자 이상이어야 합니다."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("올바르지 않은 이메일주소입니다.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 5 })
      .withMessage("비밃번호는 5글자 이상이어야 합니다."),

    errorWrap(controllers.user_register)
  )

  // 메일 인증 요청
  .post("/verify", userGuard("INACTIVATED"), errorWrap(controllers.user_verify))

  // 메일 인증키 전송 요청
  .post(
    "/verify/send",
    userGuard("INACTIVATED"),
    errorWrap(controllers.user_verify_send)
  )

  // 로그인 요청
  .post("/login", userGuard("LOGGED_OUT"), errorWrap(controllers.user_login))

  // 로그아웃 요청
  .post("/logout", userGuard("LOGGED_IN"), errorWrap(controllers.user_logout))

  // 프로필 정보 요청
  .get("/profile", userGuard("LOGGED_IN"), errorWrap(controllers.user_profile))

  // 팔로우중인 유저 목록 요청
  .get(
    "/following",
    userGuard("ACTIVATED"),
    errorWrap(controllers.user_following)
  )

  // 팔로우 토글 요청
  .post(
    "/follow_toggle",
    userGuard("INACTIVATED"),
    errorWrap(controllers.user_follow_toggle)
  );
