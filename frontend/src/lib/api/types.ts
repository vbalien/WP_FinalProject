export type ErrorResponse = {
  error: string;
};

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  activated: boolean;
};

export type UserView = Omit<User, "password">;
export type UserProfile = UserView & {
  _count: {
    followedBy: number;
    following: number;
  };
};

type HashTag = {
  name: string;
};
type Attatchment = {
  id: string;
};
export type Post = {
  id: string;
  createdAt: string;
  content: string;
  author: UserView;
  attatchments: Attatchment[];
  hashtags: HashTag[];
};

export type Message = {
  fromId: string;
  toId: string;
  text: string;
};
