import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Pagination, PostCard } from "../components";
import { allPosts } from "../lib/api/posts";
import { Post } from "../lib/api/types";
import userState from "../store/userState";

export default function Home() {
  const me = useRecoilValue(userState);
  const [posts, setPosts] = useState<Post[]>(null);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.has("page")
    ? Number.parseInt(searchParams.get("page"))
    : 1;
  const query = searchParams.has("query") ? searchParams.get("query") : "";
  const kind = searchParams.has("kind") ? searchParams.get("kind") : "";
  const exact = searchParams.has("exact") ? searchParams.get("exact") : "";

  const onPageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setTotal(0);
        setPosts(null);
        const res = await allPosts({
          skip: (currentPage - 1) * 9,
          query,
          kind,
          exact,
        });
        setTotal(res.data.total);
        setPosts(res.data.posts);
      } catch (err) {
        alert(err.message);
      }
    })();
  }, [currentPage, query, kind, exact]);

  return (
    <VStack p={3}>
      <Heading alignSelf="start">
        {query
          ? `${
              kind === "author"
                ? "작성자"
                : kind === "hashtag"
                ? "해시태그"
                : "내용"
            }${exact && " 일치"} 검색: "${query}"`
          : "전체 게시글"}
      </Heading>
      <Box w="full">
        {posts ? (
          <SimpleGrid columns={3} spacing={5}>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                editable={post.author.id === me.id}
                {...post}
              />
            ))}
          </SimpleGrid>
        ) : (
          "로딩중..."
        )}
      </Box>
      <Flex justifyContent="center">
        <Pagination
          onPageChange={onPageChange}
          totalCount={total}
          pageSize={9}
          currentPage={currentPage}
          siblingCount={2}
        />
      </Flex>
    </VStack>
  );
}
