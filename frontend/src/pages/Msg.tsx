import { Box, Flex, VStack, Text } from "@chakra-ui/react";

export default function Msg() {
  return (
    <Flex
      mt={3}
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      height="48rem"
    >
      <VStack width="16rem" height="full" borderRightWidth="1px"></VStack>
      <Box flexGrow={1}>
        <Text mt={4} align="center" color="gray.600">
          {"대화할 상대를 선택하세요."}
        </Text>
      </Box>
    </Flex>
  );
}
