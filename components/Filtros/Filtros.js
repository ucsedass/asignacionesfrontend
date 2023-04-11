import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";
import { FaSearch } from "react-icons/fa";

const Filtros = ({
  setInfoConceptosConfiguracion,
  setInfoFechasVencimientos,
  setIdPeriodoAcademico,
  idPeriodoAcademico,
  refrescar,
  setDatosFiltro,
}) => {
  const [datosSedes, setDatosSedes] = useState([]);
  const [datosConceptos, setDatosConceptos] = useState([
    { codConcepto: "", DescripcionConcepto: "" },
  ]);
  const [datosTipoConceptos, setDatosTipoConceptos] = useState([]);
  const [datosProgramaAcademico, setDatosProgramaAcademico] = useState([]);
  const [valorProgramaAcademico, setValorProgramaAcademico] = useState(0);
  const [valorCodConcepto, setValorCodConcepto] = useState(0);

  /*********************************************************************************/
  const [valorCodTipoConcepto, setValorCodTipoConcepto] = useState(0);
  const [valorIdSede, setValorIdSede] = useState(0);
  const [valorIdMes, setValorIdMes] = useState(0);
  const [valorAnio, setValorAnio] = useState(0);
  const [valorIdPeriodoAcademico, setValorIdPeriodoAcademico] = useState(0);

  /******************************************************************************************/

  const [vigentes, setVigentes] = useState("");
  const [gatillo, setGatillo] = useState(false);
  useEffect(() => {
    traerSedes();
    // traerConceptos();
    traerTipoConceptos();
    // traerProgramaAcademico();
  }, []);
  useEffect(() => {
    traerConceptosConfiguracion();

    console.log(datosTipoConceptos);

    let descripcionSede = datosSedes.filter(
      (x) => x.idSede === parseInt(valorIdSede)
    );

    let descripcionTipoConcepto = datosTipoConceptos.filter(
      (x) => x.codTipoConcepto === parseInt(valorCodTipoConcepto)
    );

    let descripcionMes = meses.filter((x) => x.idMes === parseInt(valorIdMes));

    setDatosFiltro({
      descSede:
        datosSedes.length === 0 || valorIdSede === 0
          ? ""
          : descripcionSede[0].Nombre,
      descPeriodoAcademico: valorIdPeriodoAcademico,
      descTipoConcepto:
        datosTipoConceptos.length === 0 || valorCodTipoConcepto === 0
          ? ""
          : descripcionTipoConcepto[0].DescripcionTipoConcepto,
      descMes:
        descripcionMes.length === 0 || valorIdMes === 0
          ? ""
          : descripcionMes[0].nombre,
      descAnio: valorAnio,
    });
  }, [
    valorIdPeriodoAcademico,
    valorIdSede,
    valorCodTipoConcepto,
    valorIdMes,
    valorAnio,
    refrescar,
  ]);

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
  }, [valorIdSede, valorCodTipoConcepto, idPeriodoAcademico]);

  const traerProgramaAcademico = (data) => {
    clienteAxios("/programaacademico", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        setDatosProgramaAcademico(respuesta.data);
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

  const traerConceptosConfiguracion = () => {
    clienteAxios("/conceptosconfiguracion", {
      method: "POST",
      data: {
        idSede: valorIdSede,
        idPeriodoAcademico: valorIdPeriodoAcademico,
        codTipoConcepto: valorCodTipoConcepto,
        mes: valorIdMes,
        anio: valorAnio,
      },
    })
      .then((respuesta) => {
        setInfoConceptosConfiguracion(respuesta.data);
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
    { id: new Date().getFullYear() - 4 },
    { id: new Date().getFullYear() - 3 },
    { id: new Date().getFullYear() - 2 },
    { id: new Date().getFullYear() - 1 },
    { id: new Date().getFullYear() },
    { id: new Date().getFullYear() + 1 },
  ];

  const meses = [
    { idMes: 1, nombre: "ENERO" },
    { idMes: 2, nombre: "FEBRERO" },
    { idMes: 3, nombre: "MARZO" },
    { idMes: 4, nombre: "ABRIL" },
    { idMes: 5, nombre: "MAYO" },
    { idMes: 6, nombre: "JUNIO" },
    { idMes: 7, nombre: "JULIO" },
    { idMes: 8, nombre: "AGOSTO" },
    { idMes: 9, nombre: "SEPTIEMBRE" },
    { idMes: 10, nombre: "OCTUBRE" },
    { idMes: 11, nombre: "NOVIEMBRE" },
    { idMes: 12, nombre: "DICIEMBRE" },
  ];

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
          <Heading fontSize={14}>Sede</Heading>
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
          <Heading fontSize={14}>Período académico</Heading>
          <Select
            size="sm"
            onChange={(e) => {
              setValorIdPeriodoAcademico(e.target.value);
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
          <Heading fontSize={14}>Tipo concepto</Heading>
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
        <Box>
          <Button
            w={{ base: "100%" }}
            rightIcon={<FaSearch />}
            colorScheme="orange"
            mt={4}
            size="xs"
            // w="100px"
            h="35px"
            onClick={traerConceptosConfiguracion}
          >
            Buscar
          </Button>
        </Box>
      </Stack>
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
          <Heading fontSize={14}>Mes</Heading>
          <Select
            size="sm"
            name="valorIdMes"
            id="valorIdMes"
            onChange={(e) => {
              setValorIdMes(e.target.value);
              setGatillo(!gatillo);
            }}
          >
            <option value={0}>--Seleccione--</option>
            {meses.map(({ idMes, nombre }) => (
              <option key={idMes} value={idMes} style={{ color: "black" }}>
                {idMes + " | " + nombre}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <Heading fontSize={14}>Año</Heading>
          <Select
            size="sm"
            onChange={(e) => {
              setValorAnio(e.target.value);
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
      </Stack>
    </>
  );
};

export default Filtros;
