import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Button,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";
import { FaSearch } from "react-icons/fa";

const Filtros = ({
  setInfoFechasVencimientos,
  setCodConcepto,
  setIdPeriodoAcademico,
  idPeriodoAcademico,
  refrescar,
}) => {
  const [datosSedes, setDatosSedes] = useState([]);
  const [datosConceptos, setDatosConceptos] = useState([
    { codConcepto: "", DescripcionConcepto: "" },
  ]);
  const [datosTipoConceptos, setDatosTipoConceptos] = useState([]);
  const [datosProgramaAcademico, setDatosProgramaAcademico] = useState([]);
  const [valorProgramaAcademico, setValorProgramaAcademico] = useState(0);
  const [valorCodConcepto, setValorCodConcepto] = useState(0);
  const [valorCodTipoConcepto, setValorCodTipoConcepto] = useState(0);
  const [valorIdSede, setValorIdSede] = useState(0);
  const [vigentes, setVigentes] = useState("");
  const [gatillo, setGatillo] = useState(false);
  useEffect(() => {
    traerSedes();
    // traerConceptos();
    traerTipoConceptos();
    // traerProgramaAcademico();
  }, []);
  useEffect(() => {
    traerFechasVencimientos();
  }, [valorCodConcepto, idPeriodoAcademico]);

  useEffect(() => {
    let datos = {
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto,
      valorProgramaAcademico,
    };

    traerConceptos(datos);
  }, [
    valorIdSede,
    valorCodTipoConcepto,
    idPeriodoAcademico,
    valorProgramaAcademico,
  ]);

  useEffect(() => {
    let datos = {
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto,
    };
    traerProgramaAcademico(datos);
    setGatillo(!gatillo);
    console.log(datos);
  }, [valorIdSede, valorCodTipoConcepto, idPeriodoAcademico]);

  const traerProgramaAcademico = (data) => {
    clienteAxios("/programaacademico", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        setDatosProgramaAcademico(respuesta.data);
        console.log("estos son los programas academicos:", respuesta.data);
        console.log("ESTE ES EL PRIMER VALOR:", respuesta.data[0].idPrograma);
        setValorProgramaAcademico(respuesta.data[0].idPrograma);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const traerConceptos = (data) => {
    clienteAxios("/conceptos", { method: "POST", data: data })
      .then((respuesta) => {
        setDatosConceptos(respuesta.data);
        console.log("valores de conceptos:", respuesta.data);
        setValorCodConcepto(respuesta.data[0].codConcepto);
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
    console.log(
      "DATOS PARA TRAER FECHAS:",
      valorCodConcepto,
      valorCodTipoConcepto,
      valorIdSede,
      valorProgramaAcademico,
      idPeriodoAcademico
    );

    clienteAxios("/fechasvencimientos", {
      method: "POST",
      data: {
        codConcepto: valorCodConcepto,
        codTipoConcepto: valorCodTipoConcepto,
        idSede: valorIdSede,
        idPrograma: valorProgramaAcademico,
        idPeriodoAcademico: idPeriodoAcademico,
      },
    })
      .then((respuesta) => {
        console.log("FECHASSSSSSSS::", respuesta.data);
        setInfoFechasVencimientos(respuesta.data);
        setVigentes("todos");
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
        idPrograma: valorProgramaAcademico,
        idPeriodoAcademico: idPeriodoAcademico,
      },
    })
      .then((respuesta) => {
        setInfoFechasVencimientos(respuesta.data);
        setVigentes("vigentes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const años = [
    { id: new Date().getFullYear() - 4 },
    { id: new Date().getFullYear() - 3 },
    { id: new Date().getFullYear() - 2 },
    { id: new Date().getFullYear() - 1 },
    { id: new Date().getFullYear() },
    { id: new Date().getFullYear() + 1 },
  ];
  useEffect(() => {
    traerFechasVencimientos();
  }, [refrescar]);

  useEffect(() => {
    if (vigentes === "vigentes") {
      traerFechasVencimientosVigentes();
    } else {
      traerFechasVencimientos();
    }
  }, [vigentes]);

  return (
    <>
      <Stack
        direction={{ base: "column", sm: "column", lg: "row" }}
        w="80%"
        mx="auto"
        spacing={2}
        border="solid 2px #F1F1F1"
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
              setGatillo(!gatillo);
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
              setGatillo(!gatillo);
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
              setGatillo(!gatillo);
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
          <FormLabel fontSize={14}>Programa Académico</FormLabel>
          <Select
            size="sm"
            name="idPrograma"
            id="idPrograma"
            value={valorProgramaAcademico}
            onChange={(e) => {
              setValorProgramaAcademico(e.target.value);
              setGatillo(!gatillo);
            }}
          >
            {datosProgramaAcademico.map(
              ({ idPrograma, NombreProgramaAcademico }) => (
                <option
                  key={idPrograma}
                  value={idPrograma}
                  style={{ color: "black" }}
                >
                  {NombreProgramaAcademico}
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
            value={valorCodConcepto}
            onClick={(e) => {
              setCodConcepto(e.target.value);
            }}
            onChange={(e) => {
              setValorCodConcepto(e.target.value);
              setCodConcepto(e.target.value);
              setGatillo(!gatillo);
            }}
          >
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
            w={{ base: "100%" }}
            rightIcon={<FaSearch />}
            colorScheme="orange"
            mt={7}
            size="xs"
            // w="100px"
            h="35px"
            onClick={traerFechasVencimientos}
          >
            Buscar
          </Button>
        </Box>
      </Stack>
      <Box w="80%" mx="auto" mt={2}>
        <RadioGroup
          defaultValue="todos"
          onChange={setVigentes}
          value={vigentes}
          size="sm"
        >
          <Stack direction="row">
            <Radio value="todos">Todos</Radio>
            <Radio value="vigentes">Vigentes</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </>
  );
};

export default Filtros;
