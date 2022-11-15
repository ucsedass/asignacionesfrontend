import React, { useEffect, useState } from "react";
import Tabla from "react-data-table-component";
import { Box, FormLabel, Center, background } from "@chakra-ui/react";
import Moment from "moment";
import { estiloTablas } from "../estiloTablas";

const TablaPrincipal = ({ infoFechasVencimientos }) => {
  const columns = [
    {
      name: (
        <h5>
          <strong>Fecha Inicio</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>
          {Moment(row.FechaInicioVigenciaPrecio)
            .add(1, "days")
            .format("DD-MM-YYYY")}
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
          {Moment(row.FechaFinVigenciaPrecio)
            .add(1, "days")
            .format("DD-MM-YYYY")}
        </strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>1º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>{"$ " + parseFloat(row.PrecioVto1).toFixed(2)}</strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>2º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>{"$ " + parseFloat(row.PrecioVto2).toFixed(2)}</strong>
      ),
    },
    {
      name: (
        <h5>
          <strong>3º Vto</strong>
        </h5>
      ),
      cell: (row) => (
        <strong>{"$ " + parseFloat(row.PrecioVto3).toFixed(2)}</strong>
      ),
    },
  ];

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Center bgColor="gray.100">
          <FormLabel mb="0px">ASIGNACION DE FECHAS DE VENCIMIENTOS</FormLabel>
        </Center>
        <Tabla
          columns={columns}
          data={infoFechasVencimientos}
          defaultSortFieldId={1}
          customStyles={estiloTablas}
          noDataComponent="No se encontraron datos."
        />
      </Box>
    </>
  );
};

export default TablaPrincipal;
