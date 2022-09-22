import React from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
const NuevoPrecio = () => {
  return (
    <>
      <Stack
        direction={["column", "row"]}
        w="80%"
        mx="auto"
        spacing={2}
        border="solid 1px #F1F1F1"
        p={2}
        mt={5}
      >
        <FormControl>
          <FormLabel fontSize={14}>Fecha Inicio</FormLabel>
          <Input size="xs" type="date" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Fecha Fin</FormLabel>
          <Input size="xs" type="date" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>1º Vencimiento</FormLabel>
          <Input size="xs" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>2º Vencimiento</FormLabel>
          <Input size="xs" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>3º Vencimiento</FormLabel>
          <Input size="xs" />
        </FormControl>
      </Stack>
      <Box w="80%" mx="auto" mt={3}>
        <Button size="xs" w="100%" colorScheme="blue">
          Guardar
        </Button>
      </Box>
    </>
  );
};

export default NuevoPrecio;
