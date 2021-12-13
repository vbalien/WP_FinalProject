import request from "./request";
import { Message, Room } from "./types";

type GetRoomsResponse = {
  data: Room[];
};
/**
 * 채팅 가능한 유저 목록
 */
export async function getRooms() {
  const res = await request<GetRoomsResponse>("GET", "/messages/");
  for (const room of res.data) {
    const { data } = await getMessages(room.id, 1);
    if (data.length < 1) {
      room.last_msg = null;
    } else {
      room.last_msg = data[0];
    }
  }
  return res;
}

type GetMessagesResponse = {
  data: Message[];
};
export function getMessages(userId: string, take?: number) {
  return request<GetMessagesResponse>(
    "GET",
    `/messages/${userId}?take=${take}`
  );
}

type SendMessagesResponse = {
  data: Message;
};
export function sendMessage(userId: string, text: string) {
  return request<SendMessagesResponse>("POST", `/messages/${userId}/send`, {
    text,
  });
}
