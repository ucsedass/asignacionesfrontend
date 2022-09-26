import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";

const Filtros = ({ setInfoConceptos }) => {
  const [datosSedes, setDatosSedes] = useState([]);

  useEffect(() => {
    traerSedes();
  }, []);

  const traerSedes = () => {
    clienteAxios
      .get("/sedes")
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosSedes(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const traerInfoConceptos = () => {
    traerSedes();
    clienteAxios
      .get("/conceptos")
      .then((respuesta) => {
        setInfoConceptos(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            {datosSedes.map(({ idSede, Nombre }) => (
              <option key={idSede} value={idSede} style={{ color: "black" }}>
                {Nombre}
              </option>
            ))}
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
          <Button
            colorScheme="green"
            mt={7}
            size="xs"
            w="100px"
            h="35px"
            onClick={traerInfoConceptos}
          >
            Buscar
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default Filtros;
