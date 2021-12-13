import request from "./request";
import { Post } from "./types";

type AllPostsResponse = {
  data: {
    total: number;
    posts: Post[];
  };
};
type AllPostsPayload = {
  take?: number;
  skip?: number;
  kind?: string;
  query?: string;
  exact?: string;
};
/**
 * 모든 게시글 목록
 */
export function allPosts({
  take = 9,
  skip = 0,
  kind = "",
  query = "",
  exact = "",
}: AllPostsPayload) {
  return request<AllPostsResponse>(
    "GET",
    `/posts/?take=${take}&skip=${skip}&kind=${kind}&query=${query}&exact=${exact}`
  );
}

type NewPostResponse = {
  data: Post;
};
type NewPostPayload = {
  /**
   * 게시글 내용
   */
  content: string;

  /**
   * 이미지 ID 목록
   */
  images: string[];
};
/**
 * 게시글 등록
 */
export function newPost(payload: NewPostPayload) {
  return request<NewPostResponse>("POST", "/posts/", payload);
}

type EditPostResponse = {
  data: Post;
};
type EditPostPayload = {
  /**
   * 게시글 내용
   */
  content: string;

  /**
   * 이미지 ID 목록
   */
  images: string[];
};
/**
 * 게시글 수정
 */
export function editPost(postId: string, payload: EditPostPayload) {
  return request<EditPostResponse>("PUT", `/posts/${postId}`, payload);
}

type DeletePostResponse = {
  data: Post;
};
/**
 * 게시글 삭제
 */
export function deletePost(postId: string) {
  return request<DeletePostResponse>("DELETE", `/posts/${postId}`);
}
