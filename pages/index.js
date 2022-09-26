import React, { useState, useEffect } from "react";
import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import NuevoPrecio from "../components/NuevoPrecio/NuevoPrecio";
export default function Home() {
  const [infoConceptos, setInfoConceptos] = useState([]);

  return (
    <>
      <Filtros setInfoConceptos={setInfoConceptos} />
      <TablaPrincipal infoConceptos={infoConceptos} />
      <NuevoPrecio />
    </>
  );
}
