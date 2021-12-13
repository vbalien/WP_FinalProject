import request from "./request";
import { UserProfile, UserView } from "./types";

type AllUsersResponse = {
  data: UserView[];
};
/**
 * 모든 유저 목록
 */
export function allUsers() {
  return request<AllUsersResponse>("GET", "/users/");
}

type LoginResponse = {
  data: UserView;
};
/**
 * 로그인 요청
 */
export function login(username: string, password: string) {
  return request<LoginResponse>("POST", "/users/login", {
    username,
    password,
  });
}

/**
 * 로그아웃 요청
 */
export function logout() {
  return request("POST", "/users/logout");
}

type RegisterPayload = {
  username: string;
  password: string;
  name: string;
  email: string;
};
type RegisterResponse = {
  data: UserView;
};
/**
 * 회원가입 요청
 */
export function register(payload: RegisterPayload) {
  return request<RegisterResponse>("POST", "/users/register", payload);
}

type ProfileResponse = {
  data: UserProfile;
};
/**
 * 프로필 요정
 */
export function profile() {
  return request<ProfileResponse>("GET", "/users/profile");
}

/**
 * 이메일 인증 전송
 */
export function verifySend() {
  return request<{ data: string }>("POST", "/users/verify/send");
}

type VerifyResponse = {
  data: UserView;
};
/**
 * 이메일 인증코드 검증
 */
export function verify(token: string) {
  return request<VerifyResponse>("POST", "/users/verify", { token });
}

type FollowingResponse = {
  /**
   * 팔로우중인 user의 id 목록
   */
  data: string[];
};
/**
 * 팔로우중 유저 ID 요청
 */
export function following() {
  return request<FollowingResponse>("GET", "/users/following");
}

type FollowToggleResponse = {
  data: UserView;
};
/**
 * 팔로우 토글 요청
 */
export function followToggle(username: string) {
  return request<FollowToggleResponse>("POST", "/users/follow_toggle", {
    username,
  });
}
