import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { login } from "../../lib/api/users";
import userState from "../../store/userState";
import InstagramLogo from "./images/Instagram_logo.png";

export default function Login() {
  const setUser = useSetRecoilState(userState);
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await login(
        usernameRef.current.value,
        passwordRef.current.value
      );
      setUser(res.data);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Container maxW="sm" centerContent>
      <form css={{ width: "100%" }} onSubmit={onSubmit}>
        <VStack alignItems="flex-end" spacing="5">
          <Box>
            <Image src={InstagramLogo} />
          </Box>

          <Box>
            <Text
              color="gray.500"
              align="center"
              fontSize="xl"
              wordBreak="keep-all"
            >
              {"친구들의 사진을 보려면 로그인해주세요."}
            </Text>
          </Box>

          <FormControl>
            <FormLabel>{"ID(유저이름)"}</FormLabel>
            <Input ref={usernameRef} type="text" required />
          </FormControl>

          <FormControl>
            <FormLabel>{"패스워드"}</FormLabel>
            <Input ref={passwordRef} type="password" required />
          </FormControl>

          <HStack spacing="5">
            <Link as={RouterLink} to="/account">
              {"회원가입"}
            </Link>
            <Button type="submit">{"로그인"}</Button>
          </HStack>
        </VStack>
      </form>
    </Container>
  );
}
