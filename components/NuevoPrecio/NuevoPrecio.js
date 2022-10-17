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
import { MODERN_BROWSERSLIST_TARGET } from "next/dist/shared/lib/constants";
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
    };
    console.log("datos para mandar al sp:", data);
    clienteAxios("/agregarfechasvencimientos", {
      method: "POST",
      data: data,
    })
      .then((respuesta) => {
        console.log("Exito:", respuesta);
        setRefrescar(!refrescar);
        setModalExito(true);
        setModalConfirmacion(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
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
        direction={["column", "row"]}
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
        {error && (
          <Box bgColor="red.400">
            <Center color="white">REVISAR DATOS</Center>
          </Box>
        )}

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
                <Text>Error.</Text>
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
