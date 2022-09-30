import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";
const NuevoPrecio = ({ codConcepto, idPeriodoAcademico }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precio1v, setPrecio1v] = useState("");
  const [precio2v, setPrecio2v] = useState("");
  const [precio3v, setPrecio3v] = useState("");

  const guardarFechaPrecio = () => {
    var data = {
      codConcepto: codConcepto,
      idPeriodoAcademico: idPeriodoAcademico,
      fechaInicioVigencia: fechaInicio,
      fechaFinVigencia: fechaFin,
      importeVto1: precio1v,
      importeVto2: precio2v,
      importeVto3: precio3v,
      idUsuario: 53,
    };
    console.log("datos para mandar al sp:", data);
    clienteAxios("/agregarfechasvencimientos", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        console.log(respuesta);
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
        mt={5}
      >
        <FormControl>
          <FormLabel fontSize={14}>Fecha Inicio</FormLabel>
          <Input
            size="xs"
            type="date"
            onChange={(e) => {
              setFechaInicio(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Fecha Fin</FormLabel>
          <Input
            size="xs"
            type="date"
            onChange={(e) => {
              setFechaFin(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>1º Vencimiento</FormLabel>
          <Input
            size="xs"
            onChange={(e) => {
              setPrecio1v(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>2º Vencimiento</FormLabel>
          <Input
            size="xs"
            onChange={(e) => {
              setPrecio2v(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>3º Vencimiento</FormLabel>
          <Input
            size="xs"
            onChange={(e) => {
              setPrecio3v(e.target.value);
            }}
          />
        </FormControl>
      </Stack>
      <Box w="80%" mx="auto" mt={3}>
        <Button
          size="xs"
          w="100%"
          colorScheme="blue"
          onClick={guardarFechaPrecio}
        >
          Guardar
        </Button>
      </Box>
    </>
  );
};

export default NuevoPrecio;
