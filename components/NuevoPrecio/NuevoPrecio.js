import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  Center,
  ModalHeader,
  VStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import clienteAxios from "../../config/axios";
import {
  FaRegSave,
  FaRegCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const NuevoPrecio = ({
  codConcepto,
  idPeriodoAcademico,
  setRefrescar,
  refrescar,
}) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [precio1v, setPrecio1v] = useState("");
  const [precio2v, setPrecio2v] = useState("");
  const [precio3v, setPrecio3v] = useState("");
  const [error, setError] = useState(true);

  const [ok, setOk] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [modalConfirmacion, setModalConfirmacion] = useState(false);
  const [modalExito, setModalExito] = useState(false);
  const [modalError, setModalError] = useState(false);

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

    if (
      codConcepto !== 0 &&
      idPeriodoAcademico !== 0 &&
      codConcepto !== "0" &&
      idPeriodoAcademico !== "0"
    ) {
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
          } else {
            setModalError(true);
            setModalConfirmacion(false);
          }
        })
        .catch((error) => {
          console.log("Error", error);
          setModalError(true);
        });
    } else {
      setModalConfirmacion(false);
      setModalError(true);

      console.log("NO INGRESO AL PROCEDIMEINTO ALMACENADO");
    }
  };

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
  return (
    <>
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

export default NuevoPrecio;
