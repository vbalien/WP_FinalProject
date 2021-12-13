import { Outlet } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import Login from "./Login";
import userState from "../../store/userState";
import Verify from "./Verify";
import { Navbar } from "../../components";
import { Container } from "@chakra-ui/react";

function PageLayout() {
  return (
    <>
      <Navbar />
      <Container maxW="5xl">
        <Outlet />
      </Container>
    </>
  );
}

export default function Root() {
  const userLoadable = useRecoilValueLoadable(userState);
  switch (userLoadable.state) {
    case "hasValue":
      if (!userLoadable.contents) {
        return <Login />;
      } else if (!userLoadable.contents.activated) {
        return <Verify />;
      } else {
        return <PageLayout />;
      }
    case "loading":
      return <div>{"회원 정보 가져오는 중..."}</div>;
    case "hasError":
      return <Login />;
  }
}
