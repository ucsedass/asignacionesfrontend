import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Button,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";

const Filtros = ({
  setInfoFechasVencimientos,
  setCodConcepto,
  setIdPeriodoAcademico,
  idPeriodoAcademico,
}) => {
  const [datosSedes, setDatosSedes] = useState([]);
  const [datosConceptos, setDatosConceptos] = useState([]);
  const [datosTipoConceptos, setDatosTipoConceptos] = useState([]);
  const [valorCodConcepto, setValorCodConcepto] = useState(0);
  const [valorCodTipoConcepto, setValorCodTipoConcepto] = useState(0);
  const [valorIdSede, setValorIdSede] = useState(0);
  const [vigentes, setVigentes] = useState(false);
  useEffect(() => {
    traerSedes();
    traerConceptos();
    traerTipoConceptos();
  }, []);

  const traerConceptos = () => {
    clienteAxios
      .get("/conceptos")
      .then((respuesta) => {
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
        setDatosSedes(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const traerFechasVencimientos = () => {
    clienteAxios("/fechasvencimientos", {
      method: "POST",
      data: {
        codConcepto: valorCodConcepto,
        codTipoConcepto: valorCodTipoConcepto,
        idSede: valorIdSede,
        idPeriodoAcademico: idPeriodoAcademico,
      },
    })
      .then((respuesta) => {
        setInfoFechasVencimientos(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const traerFechasVencimientosVigentes = () => {
    clienteAxios("/fechasvencimientosvigentes", {
      method: "POST",
      data: {
        codConcepto: valorCodConcepto,
        codTipoConcepto: valorCodTipoConcepto,
        idSede: valorIdSede,
      },
    })
      .then((respuesta) => {
        setInfoFechasVencimientos(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const años = [
    { id: 2018 },
    { id: 2019 },
    { id: 2020 },
    { id: 2021 },
    { id: 2022 },
    { id: 2023 },
  ];

  const checked = () => {
    console.log("chekeddd", vigentes);
    if (vigentes === true) {
      traerFechasVencimientos();
      console.log("esta en true", new Date());
    } else {
      console.log("esta en false");
      traerFechasVencimientosVigentes();
    }
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
          <Select
            size="sm"
            name="idSede"
            id="idSede"
            onChange={(e) => {
              setValorIdSede(e.target.value);
            }}
          >
            <option value={0}>--Seleccione--</option>
            {datosSedes.map(({ idSede, Nombre }) => (
              <option key={idSede} value={idSede} style={{ color: "black" }}>
                {idSede + " | " + Nombre}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Año</FormLabel>
          <Select
            size="sm"
            onChange={(e) => {
              setIdPeriodoAcademico(e.target.value);
            }}
          >
            <option value={0}>--Seleccione--</option>
            {años.map(({ id }) => (
              <option key={id} value={id} style={{ color: "black" }}>
                {id}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Tipo concepto</FormLabel>
          <Select
            size="sm"
            name="codTipoConcepto"
            id="codTipoConcepto"
            onChange={(e) => {
              setValorCodTipoConcepto(e.target.value);
            }}
          >
            <option value={0}>--Seleccione--</option>
            {datosTipoConceptos.map(
              ({ codTipoConcepto, DescripcionTipoConcepto }) => (
                <option
                  key={codTipoConcepto}
                  value={codTipoConcepto}
                  style={{ color: "black" }}
                >
                  {codTipoConcepto + " | " + DescripcionTipoConcepto}
                </option>
              )
            )}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel fontSize={14}>Concepto</FormLabel>
          <Select
            size="sm"
            id="concepto"
            name="concepto"
            onChange={(e) => {
              setValorCodConcepto(e.target.value);
              setCodConcepto(e.target.value);
            }}
          >
            <option value={0}>--Seleccione--</option>
            {datosConceptos.map(({ codConcepto, DescripcionConcepto }) => (
              <option
                key={codConcepto}
                value={codConcepto}
                style={{ color: "black" }}
              >
                {codConcepto + " | " + DescripcionConcepto}
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
      <Box w="80%" mx="auto" mt={2}>
        <Checkbox
          onChange={() => {
            checked();
            setVigentes(!vigentes);
          }}
        >
          Vigentes
        </Checkbox>
      </Box>
    </>
  );
};

export default Filtros;
