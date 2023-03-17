import React, { useEffect, useState } from "react";
import Tabla from "react-data-table-component";
import {
  Box,
  FormLabel,
  Center,
  background,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Stack,
  VStack,
  Icon,
  Text,
  FormControl,
} from "@chakra-ui/react";
import {
  FaRegSave,
  FaRegCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Moment from "moment";
import { estiloTablas } from "../estiloTablas";
import clienteAxios from "../../config/axios";

const TablaPrincipal = ({
  infoConceptosConfiguracion,
  idPeriodoAcademico,
  setRefrescar,
  refrescar,
}) => {
  /************************  USE STATE DE PRECIO  **********************************************/
  const [modalAgregarPrecio, setModalAgregarPrecio] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precio1v, setPrecio1v] = useState("");
  const [precio2v, setPrecio2v] = useState("");
  const [precio3v, setPrecio3v] = useState("");
  const [error, setError] = useState(true);

  const [codConcepto, setCodConcepto] = useState(0);

  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  /************************************ MODAL CONFIRMACION ***************************************************** */

  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalExito, setModalExito] = useState(false);
  const [modalError, setModalError] = useState(false);

  const validarCampos = () => {
    if ([precio1v, precio2v, precio3v, fechaInicio, fechaFin].includes("")) {
      setError(true);
    } else {
      if (
        fechaFin < fechaInicio ||
        precio1v <= 0 ||
        precio2v <= 0 ||
        precio3v <= 0
      ) {
        setError(true);
      } else {
        setError(false);
      }
    }
    console.log(error, precio1v);
  };

  const columns = [
    {
      name: (
        <h5>
          <strong>Descripcion Concepto</strong>
        </h5>
      ),
      cell: (row) => <strong>{row.DescripcionConcepto}</strong>,

      width: "500px",
    },
    {
      name: (
        <h5>
          <strong>Programa académico</strong>
        </h5>
      ),
      cell: (row) => <strong>{row.NombreProgramaAcademico}</strong>,
      width: "400px",
    },
    {
      name: (
        <h5>
          <strong>1º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {row.PrecioVto1 !== null
            ? "$ " + parseFloat(row.PrecioVto1).toFixed(2)
            : "-"}
        </strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>2º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {row.PrecioVto2 !== null
            ? "$ " + parseFloat(row.PrecioVto2).toFixed(2)
            : "-"}
        </strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>3º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {row.PrecioVto3 !== null
            ? "$ " + parseFloat(row.PrecioVto3).toFixed(2)
            : "-"}
        </strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>Fecha Inicio</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {row.FechaInicioVigenciaPrecio !== null
            ? Moment(row.FechaInicioVigenciaPrecio)
                .add(1, "days")
                .format("DD-MM-YYYY")
            : "-"}
        </strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>Fecha Fin</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {row.FechaFinVigenciaPrecio !== null
            ? Moment(row.FechaFinVigenciaPrecio)
                .add(1, "days")
                .format("DD-MM-YYYY")
            : "-"}
        </strong>
      ),
    },
    {
      cell: (row) => (
        <Button
          m="1"
          size="sm"
          onClick={() => {
            setModalAgregarPrecio(true);

            setCodConcepto(row.codConcepto);
          }}
        >
          Editar
        </Button>
      ),
    },
  ];

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
      ok,
      mensaje,
    };
    console.log("datos para mandar al sp:", data);

    clienteAxios("/agregarfechasvencimientos", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        console.log("Exito:", respuesta.data.returnValue);
        console.log("Rta::", respuesta.data.output);
        setMensaje(respuesta.data.output.mensaje);

        if (respuesta.data.returnValue === 1) {
          setRefrescar(!refrescar);
          setModalExito(true);
          setModalConfirmacion(false);
          setModalAgregarPrecio(false);
        } else {
          setModalError(true);
          setModalConfirmacion(false);
          setModalAgregarPrecio(false);
          setModalExito(false);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        setModalError(true);
      });
  };

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Center bgColor="gray.100">
          <FormLabel mb="0px">ASIGNACION DE FECHAS DE VENCIMIENTOS</FormLabel>
        </Center>
        <Tabla
          columns={columns}
          data={infoConceptosConfiguracion}
          defaultSortFieldId={1}
          customStyles={estiloTablas}
          noDataComponent="No se encontraron datos."
        />
      </Box>

      <Modal
        isOpen={modalAgregarPrecio}
        onClose={() => {
          setModalAgregarPrecio(false);
        }}
        size="800px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Stack
              direction={{ base: "column", sm: "column", lg: "row" }}
              w="80%"
              mx="auto"
              spacing={2}
              border="solid 2px #F1F1F1"
              p={2}
              mt={5}
            >
              <FormControl>
                <FormLabel fontSize={14}>Fecha Inicio</FormLabel>
                <Input
                  isInvalid={fechaFin <= fechaInicio || fechaInicio === ""}
                  size="xs"
                  onBlur={validarCampos}
                  type="date"
                  onChange={(e) => {
                    setFechaInicio(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>Fecha Fin</FormLabel>
                <Input
                  isInvalid={fechaFin <= fechaInicio || fechaFin === ""}
                  size="xs"
                  onBlur={validarCampos}
                  type="date"
                  onChange={(e) => {
                    setFechaFin(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>1º Vencimiento</FormLabel>
                <Input
                  isInvalid={precio1v <= 0 || precio1v === ""}
                  type="number"
                  onBlur={validarCampos}
                  size="xs"
                  onChange={(e) => {
                    setPrecio1v(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>2º Vencimiento</FormLabel>
                <Input
                  isInvalid={precio2v <= 0 || precio2v === ""}
                  type="number"
                  onBlur={validarCampos}
                  size="xs"
                  onChange={(e) => {
                    setPrecio2v(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize={14}>3º Vencimiento</FormLabel>
                <Input
                  isInvalid={precio3v <= 0 || precio3v === ""}
                  type="number"
                  onBlur={validarCampos}
                  size="xs"
                  onChange={(e) => {
                    setPrecio3v(e.target.value);
                  }}
                />
              </FormControl>
            </Stack>
            <Box w="80%" mx="auto" mt={3}>
              {/* error && (
          <Box bgColor="red.400">
            <Center color="white">REVISAR DATOS</Center>
          </Box>
        ) */}

              <Button
                rightIcon={<FaRegSave />}
                disabled={error}
                size="xs"
                w="100%"
                colorScheme="blue"
                onClick={() => {
                  setModalConfirmacion(true);
                }}
              >
                Guardar
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalConfirmacion}
        onClose={() => {
          setModalConfirmacion(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Center fontSize={18}>Confirmar agregar registro.</Center>
          </ModalBody>

          <ModalFooter>
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => {
                setModalConfirmacion(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              size="xs"
              ml={3}
              colorScheme="blue"
              onClick={guardarFechaPrecio}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={modalExito}
        onClose={() => {
          setModalExito(false);
        }}
      >
        <ModalOverlay />
        <ModalContent bgColor={"white"}>
          <ModalBody>
            <Center>
              <VStack>
                <Icon w={20} h={20} color="green.500" as={FaRegCheckCircle} />
                <Text>Datos guardados.</Text>
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              size="xs"
              colorScheme="green"
              onClick={() => {
                setModalExito(false);
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/*Modal error*/}
      <Modal
        isOpen={modalError}
        onClose={() => {
          setModalError(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <VStack>
                <Icon w={20} h={20} color="red.500" as={FaExclamationCircle} />
                {codConcepto === 0 ||
                  (codConcepto === "0" && <Text>Seleccionar concepto.</Text>)}
                {idPeriodoAcademico === 0 ||
                  (idPeriodoAcademico === "0" && <Text>Seleccionar año.</Text>)}
                {<Text>{mensaje}</Text>}
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"red"}
              size="xm"
              w="100%"
              onClick={() => {
                setModalError(false);
              }}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TablaPrincipal;
