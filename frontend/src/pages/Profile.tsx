import { useRecoilState } from "recoil";
import {
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import userState from "../store/userState";
import { useEffect } from "react";
import { profile } from "../lib/api/users";

export default function Profile() {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    (async () => {
      const { data: user } = await profile();
      setUser(user);
    })();
  }, []);
  return (
    <VStack align="start" spacing={3}>
      <Heading>Profile</Heading>
      <hr />
      <Heading size="md">
        현재 로그인: {user.username}({user.name})
      </Heading>
      <Heading size="sm">현재 시간: {new Date().toString()}</Heading>

      <HStack spacing={3}>
        <InputGroup>
          <InputLeftAddon children="following" />
          <Input
            type="text"
            width="4rem"
            p={2}
            readOnly
            value={user._count.following}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children="followers" />
          <Input
            type="text"
            width="4rem"
            p={2}
            readOnly
            value={user._count.followedBy}
          />
        </InputGroup>
      </HStack>
    </VStack>
  );
}
