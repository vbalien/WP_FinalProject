import { Box, Button, Container, Flex, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { logout } from "../lib/api/users";
import userState from "../store/userState";
import SearchBox from "./SearchBox";

type NavItemProps = {
  to: string;
  children?: ReactNode;
};
function NavItem(props: NavItemProps) {
  return (
    <Box>
      <Link as={RouterLink} to={props.to}>
        {props.children}
      </Link>
    </Box>
  );
}

export default function Navbar() {
  const setUser = useSetRecoilState(userState);
  const onLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <Box borderBottomColor="gray.200" borderBottomWidth="1px" p="2">
      <Container maxW="5xl">
        <Flex gap="5" alignItems="center">
          <NavItem to="/home">{"Home"}</NavItem>
          <NavItem to="/new">{"New"}</NavItem>
          <NavItem to="/profile">{"Profile"}</NavItem>
          <NavItem to="/follow">{"Follow"}</NavItem>
          <NavItem to="/msg">{"Message"}</NavItem>

          <Box flexGrow={1}>
            <SearchBox />
          </Box>

          <Button marginLeft="auto" variant="ghost" onClick={onLogout}>
            {"Logout"}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
