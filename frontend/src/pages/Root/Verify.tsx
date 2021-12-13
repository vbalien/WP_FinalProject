import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { logout, verify, verifySend } from "../../lib/api/users";
import userState from "../../store/userState";

export default function Verify() {
  const setUser = useSetRecoilState(userState);
  const tokenField = useRef<HTMLInputElement>();
  const onLogout = async () => {
    await logout();
    setUser(null);
  };

  const onSendMail = async () => {
    try {
      const res = await verifySend();
      if (res.data === "ok") {
        alert("인증 메일을 보냈습니다.\n3분 안에 인증키를 입력해주세요!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await verify(tokenField.current.value);
      alert("인증이 완료되었습니다!");
      setUser(res.data);
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Container maxW="sm" centerContent>
      <form css={{ width: "100%" }} onSubmit={onVerify}>
        <VStack spacing="5">
          <Box>
            <Text
              color="gray.500"
              align="center"
              fontSize="xl"
              wordBreak="keep-all"
            >
              {"이메일 인증을 완료해주세요."}
            </Text>
          </Box>
          <Button onClick={onSendMail}>{"인증메일 보내기"}</Button>

          <InputGroup size="md">
            <Input ref={tokenField} type="text" placeholder="인증키 입력" />
            <InputRightElement p={0} width="4.5rem">
              <Button colorScheme="blue" type="submit">
                {"인증하기"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button onClick={onLogout}>{"로그아웃"}</Button>
        </VStack>
      </form>
    </Container>
  );
}
