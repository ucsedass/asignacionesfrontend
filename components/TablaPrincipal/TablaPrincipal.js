import React from "react";
import Tabla from "react-data-table-component";
import { Box } from "@chakra-ui/react";
const TablaPrincipal = () => {
  const columns = [
    {
      name: "Concepto",
      selector: (row) => row.concepto,
      sortable: true,
    },
    {
      name: "Fecha Inicio",
      selector: (row) => row.fechaInicio,
      sortable: true,
    },
    {
      name: "Fecha Fin",
      selector: (row) => row.fechaFin,
      sortable: true,
    },
    {
      name: "1º Vto",
      selector: (row) => row.montoPrimerVencimiento,
    },
    {
      name: "2º Vto",
      selector: (row) => row.montoSegundoVencimiento,
    },
    {
      name: "3º Vto",
      selector: (row) => row.montoTercerVencimiento,
    },
  ];

  var data = [
    {
      concepto: "Matricula",
      fechaInicio: " 20/20/2021",
      fechaFin: "20/23/2036",
      montoPrimerVencimiento: "10.000",
      montoSegundoVencimiento: "20.000",
      montoTercerVencimiento: "30.000",
    },
    {
      concepto: "con 1",
      fechaInicio: " 20/20/2021",
      fechaFin: "20/23/2036",
      montoPrimerVencimiento: "10.000",
      montoSegundoVencimiento: "20.000",
      montoTercerVencimiento: "30.000",
    },
    {
      concepto: "con 1",
      fechaInicio: " 20/20/2021",
      fechaFin: "20/23/2036",
      montoPrimerVencimiento: "10.000",
      montoSegundoVencimiento: "20.000",
      montoTercerVencimiento: "30.000",
    },
    {
      concepto: "con 1",
      fechaInicio: " 20/20/2021",
      fechaFin: "20/23/2036",
      montoPrimerVencimiento: "10.000",
      montoSegundoVencimiento: "20.000",
      montoTercerVencimiento: "30.000",
    },
    {
      concepto: "con 1",
      fechaInicio: " 20/20/2021",
      fechaFin: "20/23/2036",
      montoPrimerVencimiento: "10.000",
      montoSegundoVencimiento: "20.000",
      montoTercerVencimiento: "30.000",
    },
  ];
  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Tabla columns={columns} data={data} defaultSortFieldId={1} />
      </Box>
    </>
  );
};

export default TablaPrincipal;
