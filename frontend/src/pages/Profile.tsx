import { useRecoilValue } from "recoil";
import {
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import userState from "../store/userState";

export default function Profile() {
  const user = useRecoilValue(userState);
  return (
    <VStack align="start" spacing={3}>
      <Heading>Profile</Heading>
      <hr />
      <Heading size="md">현재 로그인: {user.username}</Heading>
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
          <InputLeftAddon children="followed" />
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
