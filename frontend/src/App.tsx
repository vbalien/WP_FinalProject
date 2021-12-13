import { ChakraProvider } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Account, Edit, Follow, Home, Msg, New, Profile, Root } from "./pages";

export default function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home />} />
          <Route path="new" element={<New />} />
          <Route path="edit" element={<Edit />} />
          <Route path="follow" element={<Follow />} />
          <Route path="msg" element={<Msg />} />
        </Route>
        <Route path="/account" element={<Account />} />
      </Routes>
    </ChakraProvider>
  );
}
