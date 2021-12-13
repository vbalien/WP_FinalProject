import request from "./request";

type UploadResponse = {
  data: {
    /**
     * 파일 ID
     */
    id: string;
  };
};
/**
 * 파일 업로드
 */
export function upload(file: File) {
  const data = new FormData();
  data.append("file", file);
  return request<UploadResponse>("POST", "/attatchments", data, {});
}
