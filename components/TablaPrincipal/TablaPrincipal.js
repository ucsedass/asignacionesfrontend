import React, { useEffect, useState } from "react";
import Tabla from "react-data-table-component";
import { Box, Checkbox } from "@chakra-ui/react";
import Moment from "moment";
import { estiloTablas } from "../estiloTablas";
import moment from "moment";
const TablaPrincipal = ({ infoFechasVencimientos }) => {
  const [vigentes, setVigentes] = useState(false);
  const columns = [
    {
      name: "Fecha Inicio",
      selector: (row) =>
        Moment(row.FechaInicioVigenciaPrecio).format("DD-MM-YYYY"),
    },
    {
      name: "Fecha Fin",
      selector: (row) =>
        Moment(row.FechaFinVigenciaPrecio).format("DD-MM-yyyy"),
    },
    {
      name: "1º Vto",
      selector: (row) => "$ " + parseFloat(row.PrecioVto1).toFixed(2),
    },
    {
      name: "2º Vto",
      selector: (row) => "$ " + parseFloat(row.PrecioVto2).toFixed(2),
    },
    {
      name: "3º Vto",
      selector: (row) => "$ " + parseFloat(row.PrecioVto3).toFixed(2),
    },
  ];
  const columnsVigentes = [
    {
      name: "Fecha Inicio",
      selector: (row) =>
        Moment(row.FechaInicioVigenciaPrecio).format("DD-MM-YYYY"),
    },
    {
      name: "Fecha Fin",
      selector: (row) =>
        Moment(row.FechaFinVigenciaPrecio).format("DD-MM-yyyy"),
    },
    {
      name: "1º Vto",
      when: (row) => "* " + parseFloat(row.PrecioVto1).toFixed(2),
    },
    {
      name: "2º Vto",
      selector: (row) => "* " + parseFloat(row.PrecioVto2).toFixed(2),
    },
    {
      name: "3º Vto",
      selector: (row) => "* " + parseFloat(row.PrecioVto3).toFixed(2),
    },
  ];

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Tabla
          columns={columns}
          data={infoFechasVencimientos}
          defaultSortFieldId={1}
          customStyles={estiloTablas}
          noDataComponent="Sin conceptos"
        />
      </Box>
    </>
  );
};

export default TablaPrincipal;
