import React from "react";
import Nav from "./Nav";
import { Box } from "@chakra-ui/react";

const Layout = (props) => {
  return (
    <>
      {/* <Nav /> */}
      <Box bg="white">
        <Box h={20} bg="blue.400"></Box>
        {props.children}
      </Box>
    </>
  );
};

export default Layout;
