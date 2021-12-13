import { atom } from "recoil";
import { UserProfile, UserView } from "../lib/api/types";
import { profile } from "../lib/api/users";

const userState = atom<UserProfile>({
  key: "userState",
  default: profile()
    .then((res) => res.data)
    .catch(() => null),
});
export default userState;
