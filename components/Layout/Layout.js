import React from "react";
import Nav from "./Nav";
import { Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      {/* <Nav /> */}
      <Box h={10} bg="blue.100"></Box>
      {props.children}
    </>
  );
};

export default Layout;
