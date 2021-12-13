import {
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  Divider,
  StackDivider,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { getMessages, getRooms, sendMessage } from "../lib/api/messages";
import { Message, Room } from "../lib/api/types";
import userState from "../store/userState";

function MsgArea({ room, onUpdate }: { room: Room; onUpdate: () => void }) {
  const me = useRecoilValue(userState);
  const scrollBox = useRef<HTMLDivElement>();
  const textInput = useRef<HTMLInputElement>();
  const [msgs, setMsgs] = useState<Message[]>([]);

  const onRefresh = useCallback(async () => {
    try {
      const res = await getMessages(room.id);
      setMsgs(
        res.data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      );
    } catch (err) {
      alert(err.message);
    }
  }, [room]);

  // 주기적으로 타이머로 새로고침
  useEffect(() => {
    onRefresh();
    const timer = setInterval(() => {
      onRefresh();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [onRefresh]);

  useEffect(() => {
    scrollBox.current.scrollTop = scrollBox.current.scrollHeight;
  }, [msgs]);

  const onMsgSend = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const res = await sendMessage(room.id, textInput.current.value);
        textInput.current.value = "";
        setMsgs((msgs) => [...msgs, res.data]);
        onUpdate();
      } catch (err) {
        alert(err.message);
      }
    },
    [room, onUpdate]
  );
  return (
    <Flex direction="column" w="full" h="full">
      <VStack ref={scrollBox} flexGrow={1} overflowY="scroll" py={3}>
        {msgs.map((msg) =>
          msg.toId === me.id ? (
            <Box
              key={msg.id}
              backgroundColor="gray.300"
              color="black"
              p={4}
              alignSelf="flex-start"
            >
              <Text>{msg.text}</Text>
            </Box>
          ) : (
            <Box
              key={msg.id}
              backgroundColor="blue.400"
              color="white"
              p={4}
              alignSelf="flex-end"
            >
              <Text>{msg.text}</Text>
            </Box>
          )
        )}
      </VStack>
      <Box>
        <form onSubmit={onMsgSend}>
          <InputGroup>
            <Input ref={textInput} type="text" />
            <InputRightAddon>
              <Button type="submit">전송</Button>
            </InputRightAddon>
          </InputGroup>
        </form>
      </Box>
    </Flex>
  );
}

export default function Msg() {
  const [select, setSelect] = useState<string>(null);
  const [rooms, setRooms] = useState<Room[]>([]);

  const onUpdate = async () => {
    const res = await getRooms();
    setRooms(
      res.data.sort(
        (a, b) =>
          new Date(b.last_msg.createdAt).getTime() -
          new Date(a.last_msg.createdAt).getTime()
      )
    );
  };

  useEffect(() => {
    onUpdate();
    const timer = setInterval(() => {
      onUpdate();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Heading>{"Direct Message"}</Heading>
      <Divider />
      <Flex
        mt={3}
        w="full"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        height="48rem"
      >
        <VStack
          width="16rem"
          height="full"
          borderRightWidth="1px"
          alignItems="flex-start"
          divider={<StackDivider borderColor="gray.200" />}
          spacing={0}
          overflowY="scroll"
        >
          {rooms.map((room) => (
            <VStack
              key={room.id}
              w="full"
              alignItems="flex-start"
              p={3}
              _hover={{ backgroundColor: "#eee" }}
              onClick={() => setSelect(room.id)}
              backgroundColor={select === room.id && "#eee"}
              spacing={1}
            >
              <Text fontSize="md" fontWeight="bold">
                {room.username}({room.name})
              </Text>
              <Text fontSize="sm">
                {room.last_msg?.text ?? "최근 메시지가 없습니다."}
              </Text>
              {room.last_msg && (
                <Text fontSize="sm">
                  {new Date(room.last_msg?.createdAt).toLocaleTimeString()}
                </Text>
              )}
            </VStack>
          ))}
        </VStack>
        <Box flexGrow={1}>
          {select === null ? (
            <Text mt={4} align="center" color="gray.600">
              {"대화할 상대를 선택하세요."}
            </Text>
          ) : (
            <MsgArea
              room={rooms.find((r) => r.id === select)}
              onUpdate={onUpdate}
            />
          )}
        </Box>
      </Flex>
    </>
  );
}
