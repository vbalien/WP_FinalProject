import request from "./request";
import { Message, UserView } from "./types";

type GetRoomsResponse = {
  data: UserView[];
};
/**
 * 채팅 가능한 유저 목록
 */
export function getRooms() {
  return request<GetRoomsResponse>("GET", "/messages/");
}

type GetMessagesResponse = {
  data: Message[];
};
export function getMessages(userId: string) {
  return request<GetMessagesResponse>("GET", `/messages/${userId}`);
}

type SendMessagesResponse = {
  data: Message;
};
export function sendMessage(userId: string, text: string) {
  return request<SendMessagesResponse>("POST", `/messages/${userId}/send`, {
    text,
  });
}
