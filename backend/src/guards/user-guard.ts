import express from "express";

type Role = "ALL" | "ACTIVATED" | "INACTIVATED" | "LOGGED_IN" | "LOGGED_OUT";
/**
 * 유저 상태를 검사하는 guard
 * @param role `ALL`: 모든 유저 허용
 *             `ACTIVATED`: 활성 유저 허용
 *             `INACTIVATED`: 비활성 유저 허용
 *             `LOGGED_IN`: 로그인 유저 허용
 *             `LOGGED_OUT`: 비로그인 유저 허용
 */
export default function userGuard(role: Role): express.RequestHandler {
  return (req, _res, next) => {
    if (role === "ALL") {
      next();
    }

    if (role === "ACTIVATED") {
      if (!req.user) {
        throw Error("로그인해주세요.");
      }
      if (!req.user.activated) {
        throw Error("이메일 인증해주세요.");
      }
    }

    if (role === "INACTIVATED") {
      if (!req.user) {
        throw Error("로그인해주세요.");
      }
      if (req.user.activated) {
        throw Error("이미 인증되었습니다.");
      }
    }

    if (role === "LOGGED_IN") {
      if (!req.user) {
        throw Error("로그인해주세요.");
      }
    }

    if (role === "LOGGED_OUT") {
      if (req.user) {
        throw Error("이미 로그인상태입니다.");
      }
    }

    next();
  };
}
