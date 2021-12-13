import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  HStack,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FormEvent, useRef } from "react";
import { register } from "../lib/api/users";

export default function Account() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await register({
        email: emailRef.current.value,
        name: nameRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      alert("회원가입되었습니다.\n로그인하여 이메일 인증을 완료해주세요.");
      navigate("/", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container maxW="sm" centerContent mt={3}>
      <form css={{ width: "100%" }} onSubmit={onSubmit}>
        <VStack alignItems="flex-end">
          <Box alignSelf="center">
            <Text
              color="gray.500"
              align="center"
              fontSize="xl"
              wordBreak="keep-all"
            >
              {"회원가입"}
            </Text>
          </Box>

          <FormControl>
            <FormLabel>{"이메일 주소"}</FormLabel>
            <Input ref={emailRef} type="email" required />
          </FormControl>

          <FormControl>
            <FormLabel>{"이름"}</FormLabel>
            <Input
              ref={nameRef}
              type="text"
              pattern="[A-Z,a-z,가-힣]{2,}"
              title="2자 이상의 한글,영문으로만 입력해주세요."
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>{"ID(유저이름)"}</FormLabel>
            <Input
              ref={usernameRef}
              type="text"
              pattern="[A-Z,a-z,0-9]{5,}"
              title="5자 이상의 영문,숫자로만 입력해주세요."
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>{"패스워드"}</FormLabel>
            <Input
              ref={passwordRef}
              type="password"
              pattern=".{5,}"
              title="5자 이상 입력해주세요."
              required
            />
          </FormControl>

          <HStack spacing="5">
            <Button type="submit">{"회원가입"}</Button>
          </HStack>
        </VStack>
      </form>
    </Container>
  );
}
