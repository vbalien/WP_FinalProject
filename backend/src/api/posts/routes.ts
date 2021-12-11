import { Router } from "express";
import { body } from "express-validator";
import userGuard from "../../guards/user-guard";
import errorWrap from "../error-wrap";
import * as controllers from "./controllers";

export const router = Router()
  // 피드 게시글 요청
  .get("/feed", errorWrap(controllers.post_get_all))

  // 새 게시물 작성
  .post(
    "/",
    userGuard("ACTIVATED"),

    body("content").notEmpty().withMessage("내용을 입력해주세요."),

    body("images")
      .isArray({ min: 1, max: 5 })
      .withMessage("이미지 개수를 확인해주세요."),

    errorWrap(controllers.post_add)
  )

  // 하나의 게시글 요청
  .get("/:id", userGuard("ACTIVATED"), errorWrap(controllers.post_get_one))

  // 게시글 수정 요청
  .put("/:id", userGuard("ACTIVATED"), errorWrap(controllers.post_update))

  // 게시글 삭제 요청
  .delete("/:id", userGuard("ACTIVATED"), errorWrap(controllers.post_delete));
