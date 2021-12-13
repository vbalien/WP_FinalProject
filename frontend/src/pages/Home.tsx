import { Flex, VStack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../components";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.has("page")
    ? Number.parseInt(searchParams.get("page"))
    : 1;

  const onPageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  return (
    <VStack>
      <Flex justifyContent="center">
        <Pagination
          onPageChange={onPageChange}
          totalCount={9}
          pageSize={9}
          currentPage={currentPage}
          siblingCount={2}
        />
      </Flex>
    </VStack>
  );
}
