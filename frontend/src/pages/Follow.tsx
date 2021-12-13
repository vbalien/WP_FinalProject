import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserView } from "../lib/api/types";
import { allUsers, following, followToggle } from "../lib/api/users";
import userState from "../store/userState";

export default function Follow() {
  const me = useRecoilValue(userState);
  const [users, setUsers] = useState<UserView[]>([]);
  const [followUserIds, setFollowUserIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await Promise.all([allUsers(), following()]);
        setUsers(res[0].data.filter((user) => user.id !== me.id));
        setFollowUserIds(res[1].data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  const onToggle = useCallback(
    async (user: UserView) => {
      try {
        await followToggle(user.username);
        let newIds: string[];
        if (followUserIds.includes(user.id)) {
          newIds = followUserIds.filter((id) => id !== user.id);
        } else {
          newIds = [...followUserIds, user.id];
        }
        setFollowUserIds(newIds);
      } catch (err) {
        alert(err);
      }
    },
    [followUserIds]
  );

  return (
    <Container maxW="lg" mt={3}>
      <Heading color="gray.500" align="left" fontSize="md" wordBreak="keep-all">
        {"회원님을 위한 추천"}
      </Heading>

      <hr css={{ margin: "1rem 0" }} />

      <VStack alignItems="flex-end" spacing="5">
        {users.map((user) => (
          <Flex
            key={user.id}
            direction="row"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w="full"
            p={3}
          >
            <VStack flexGrow={1} alignItems="left">
              <Text>{user.name}</Text>

              <Text color="gray.400" fontSize="sm">
                {user.username}
              </Text>
            </VStack>

            <Box>
              {followUserIds.includes(user.id) ? (
                <Button
                  h="full"
                  colorScheme="red"
                  onClick={() => onToggle(user)}
                >
                  {"언팔로우"}
                </Button>
              ) : (
                <Button
                  h="full"
                  colorScheme="blue"
                  onClick={() => onToggle(user)}
                >
                  {"팔로우"}
                </Button>
              )}
            </Box>
          </Flex>
        ))}
        <Box></Box>
      </VStack>
    </Container>
  );
}
