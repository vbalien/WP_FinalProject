import { Router } from "express";
import multer from "multer";
import userGuard from "../../guards/user-guard";
import errorWrap from "../error-wrap";
import * as controllers from "./controllers";

const upload = multer({
  dest: "uploads/",
  fileFilter: (_req, file, cb) => {
    if (!/^image\/\S+/i.test(file.mimetype)) {
      cb(new Error("이미지 파일만 업로드해주세요"));
    } else {
      cb(null, true);
    }
  },
});

export const router = Router()
  // 업로드 요청
  .post(
    "/upload",
    userGuard("ACTIVATED"),

    upload.single("file"),
    errorWrap(controllers.attatchment_upload)
  )

  // 다운로드 요청
  .get("/:id", errorWrap(controllers.attatchment_get));
