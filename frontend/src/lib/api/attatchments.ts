import request from "./request";

/**
 * 파일 업로드
 */
export function upload(file: File) {
  const data = new FormData();
  data.append("file", file);
  return request("POST", "/attatchments", data, {});
}
