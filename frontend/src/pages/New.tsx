import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function New() {
  return (
    <Container maxW="lg" mt={3}>
      <Heading color="gray.500" align="left" fontSize="md" wordBreak="keep-all">
        {"게시물 작성하기"}
      </Heading>

      <hr css={{ margin: "1rem 0" }} />

      <form>
        <VStack spacing={3}>
          <FormControl>
            <FormLabel>{"내용"}</FormLabel>
            <Textarea placeholder="내용을 입력해주세요." />
          </FormControl>

          <FormControl>
            <FormLabel>{"이미지"}</FormLabel>
          </FormControl>

          <Box alignSelf="flex-end">
            <Button colorScheme="blue">{"작성하기"}</Button>
          </Box>
        </VStack>
      </form>
    </Container>
  );
}
