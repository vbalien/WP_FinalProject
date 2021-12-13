import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>();
  const selectRef = useRef<HTMLSelectElement>();
  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({
      pathname: "/home",
      search: `?${createSearchParams({
        query: inputRef.current.value,
        kind: selectRef.current.value,
      })}`,
    });
  };

  return (
    <form onSubmit={onSearch}>
      <InputGroup size="md">
        <InputLeftAddon p={0}>
          <Select
            ref={selectRef}
            placeholder="검색옵션"
            width="100%"
            required
            borderRightRadius="none"
          >
            <option value="author">{"작성자"}</option>
            <option value="content">{"내용"}</option>
            <option value="hashtag">{"Hashtag"}</option>
          </Select>
        </InputLeftAddon>

        <Input ref={inputRef} type="text" placeholder="검색어 입력" required />

        <InputRightAddon p={0}>
          <Button type="submit" colorScheme="blue" borderLeftRadius="none">
            {" "}
            {"검색"}
          </Button>
        </InputRightAddon>
      </InputGroup>
    </form>
  );
}
