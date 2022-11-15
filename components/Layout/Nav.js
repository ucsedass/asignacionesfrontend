import React from "react";

import { Box, Center } from "@chakra-ui/react";
const Nav = () => {
  return (
    <Box
      w="100%"
      bg="blue.400"
      h="50px"
      py={2}
      bgGradient="linear(to-l, #3182CE, #63B3ED)"
    >
      <Center fontSize={20} color={"white"}>
        SISTEMAS DE ASIGNACIONES
      </Center>
    </Box>
  );
};

export default Nav;
