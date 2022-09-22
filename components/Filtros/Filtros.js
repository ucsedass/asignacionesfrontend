import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
const Filtros = () => {
  return (
    <>
      <Stack
        direction={["column", "row"]}
        w="80%"
        mx="auto"
        spacing={2}
        border="solid 1px #F1F1F1"
        p={2}
        mt={2}
      >
        <FormControl>
          <FormLabel fontSize={14}>Sede</FormLabel>
          <Select size="sm">
            <option>JUJUY</option>
            <option>RAFAELA</option>
            <option>OLIVOS</option>
            <option>SANTIAGO</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Año</FormLabel>
          <Select size="sm">
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Tipo concepto</FormLabel>
          <Select size="sm">
            <option>Matricula</option>
            <option>Ingreso</option>
            <option>Cuota</option>
            <option>Posgrado</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Concepto</FormLabel>
          <Select size="sm">
            <option>concepto 1</option>
            <option>concepto 2</option>
            <option>concepto 3</option>
            <option>concepto 4</option>
          </Select>
        </FormControl>
        <Box>
          <Button colorScheme="green" mt={7} size="xs" w="100px" h="35px">
            Buscar
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default Filtros;
