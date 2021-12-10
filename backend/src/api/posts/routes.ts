import { Router } from "express";
import multer from "multer";
import * as controllers from "./controllers";

const upload = multer({ dest: "uploads/" });

export const router = Router()
  // 모든 게시글 요청
  .get("/", controllers.post_get_all)

  // 새 게시물 작성
  .post("/", upload.array("photo", 5), controllers.post_add)

  // 하나의 게시글 요청
  .get("/:id", controllers.post_get_one)

  // 게시글 수정 요청
  .put("/:id", controllers.post_update)

  // 게시글 좋아요 토글 요청
  .post("/:id/like_toggle", controllers.post_like_toggle)

  // 게시글 삭제 요청
  .delete("/:id", controllers.post_delete);
