import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: 0,
});
export default userState;
