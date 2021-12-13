import ApiError from "./apiError";
import { ErrorResponse, Method } from "./types";

async function request<
  // Response type
  R extends Record<string, unknown> | Record<string, unknown>[] = Record<
    string,
    never
  >,
  // Payload Type
  P = unknown
>(
  method: Method,
  path: `/${string}`,
  payload?: P,
  headers?: HeadersInit
): Promise<R> {
  let body: string | FormData = undefined;

  // 기본 헤더 설정
  if (!headers) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  // FormData일 경우 payload 그대로 쓰고 아닐 경우 json데이터로 보내줌
  if (payload instanceof FormData) {
    body = payload;
  } else {
    body = payload && JSON.stringify(payload);
  }

  // fetch 요청
  const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
    method,
    mode: "cors",
    cache: "no-cache",
    headers,
    body,
  });

  // response code가 200번대 아닐 경우 throw Error
  if (res.status < 200 || res.status >= 300) {
    const errData = (await res.json()) as ErrorResponse;
    throw new ApiError(errData.error);
  }
  return res.json() as Promise<R>;
}

export default request;
