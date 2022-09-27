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

const Filtros = ({ setInfoFechasVencimientos }) => {
  const [datosSedes, setDatosSedes] = useState([]);
  const [datosConceptos, setDatosConceptos] = useState([]);
  const [datosTipoConceptos, setDatosTipoConceptos] = useState([]);
  useEffect(() => {
    traerSedes();
  }, []);

  const traerConceptos = () => {
    clienteAxios
      .get("/conceptos")
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosConceptos(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const traerTipoConceptos = () => {
    clienteAxios
      .get("/tipoconceptos")
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosTipoConceptos(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const traerFechasVencimientos = () => {
    traerSedes();
    traerConceptos();
    traerTipoConceptos();
    clienteAxios
      .get("/fechasvencimientos")
      .then((respuesta) => {
        setInfoFechasVencimientos(respuesta.data);
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
              <option
                key={idSede + Nombre}
                value={idSede}
                style={{ color: "black" }}
              >
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
            {datosTipoConceptos.map(
              ({ idTipoConcepto, DescripcionTipoConcepto }) => (
                <option
                  key={idTipoConcepto}
                  value={idTipoConcepto}
                  style={{ color: "black" }}
                >
                  {DescripcionTipoConcepto}
                </option>
              )
            )}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Concepto</FormLabel>
          <Select size="sm">
            {datosConceptos.map(({ idConcepto, DescripcionConcepto }) => (
              <option
                key={idConcepto}
                value={idConcepto}
                style={{ color: "black" }}
              >
                {DescripcionConcepto}
              </option>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button
            colorScheme="green"
            mt={7}
            size="xs"
            w="100px"
            h="35px"
            onClick={traerFechasVencimientos}
          >
            Buscar
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default Filtros;
