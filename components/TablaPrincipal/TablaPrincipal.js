import React, { useEffect } from "react";
import Tabla from "react-data-table-component";
import { Box } from "@chakra-ui/react";
import Moment from "moment";
import { estiloTablas } from "../estiloTablas";
const TablaPrincipal = ({ infoConceptos }) => {
  const columns = [
    {
      name: "Fecha Inicio",
      selector: (row) =>
        Moment(row.FechaInicioVigenciaPrecio).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "Fecha Fin",
      selector: (row) =>
        Moment(row.FechaFinVigenciaPrecio).format("DD-MM-YYYY"),
      sortable: true,
    },
    {
      name: "1º Vto",
      selector: (row) => row.PrecioVto1,
    },
    {
      name: "2º Vto",
      selector: (row) => row.PrecioVto2,
    },
    {
      name: "3º Vto",
      selector: (row) => row.PrecioVto3,
    },
  ];

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Tabla
          columns={columns}
          data={infoConceptos}
          defaultSortFieldId={1}
          customStyles={estiloTablas}
          noDataComponent="Sin conceptos"
        />
      </Box>
    </>
  );
};

export default TablaPrincipal;
