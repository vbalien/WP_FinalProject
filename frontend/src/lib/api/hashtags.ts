import request from "./request";
import { Post } from "./types";

type GetHashtagResponse = {
  data: {
    total: number;
    posts: Post[];
  };
};
/**
 * 모든 해시태그 게시글 목록
 */
export function getHashtag(
  hashtag: string,
  take: number = 9,
  skip: number = 0
) {
  return request<GetHashtagResponse>(
    "GET",
    `/hashtags/${encodeURIComponent(hashtag)}?take=${take}&skip=${skip}`
  );
}
