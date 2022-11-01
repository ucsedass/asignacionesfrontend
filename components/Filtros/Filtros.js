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
  useEffect(() => {
    traerSedes();
    // traerConceptos();
    traerTipoConceptos();
    traerProgramaAcademico();
  }, []);

  useEffect(() => {
    console.log(
      "Aqui hay que actualizar los CONCEPTOS",
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto,
      valorProgramaAcademico
    );

    let datos = {
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto,
      valorProgramaAcademico,
    };
    console.log("ESTOS SON LOS DATOS CONCEPTOS::", datosConceptos);
    traerConceptos(datos);
  }, [
    valorIdSede,
    valorCodTipoConcepto,
    idPeriodoAcademico,
    valorProgramaAcademico,
  ]);

  useEffect(() => {
    console.log(
      "aqui hay que actualizar los PROGRAMAS",
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto
    );
    let datos = {
      valorIdSede,
      idPeriodoAcademico,
      valorCodTipoConcepto,
    };
    traerProgramaAcademico(datos);
  }, [valorIdSede, valorCodTipoConcepto, idPeriodoAcademico]);

  const traerProgramaAcademico = (data) => {
    console.log("antes de mandar", data);
    clienteAxios("/programaacademico", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        setDatosProgramaAcademico(respuesta.data);
        console.log("PRORGAMAS ACADEMICOS", datosProgramaAcademico);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const traerConceptos = (data) => {
    clienteAxios("/conceptos", { method: "POST", data: data })
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
    console.log("TODOS:", valorCodConcepto, valorCodTipoConcepto, valorIdSede);
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
    { id: 2018 },
    { id: 2019 },
    { id: 2020 },
    { id: 2021 },
    { id: 2022 },
    { id: 2023 },
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
        direction={["column", "row"]}
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
          <FormLabel fontSize={14}>Programa Académico</FormLabel>
          <Select
            size="sm"
            name="idPrograma"
            id="idPrograma"
            onChange={(e) => {
              setValorProgramaAcademico(e.target.value);
            }}
          >
            <option value={0}>--Seleccione--</option>
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
            onChange={(e) => {
              setValorCodConcepto(e.target.value);
              setCodConcepto(e.target.value);
            }}
          >
            if (datosConceptos === [] || datosConceptos === undefined)
            {<option value={0}>--Seleccione--</option>} else
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
            rightIcon={<FaSearch />}
            colorScheme="orange"
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
