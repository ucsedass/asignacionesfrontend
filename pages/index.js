import React, { useState, useEffect } from "react";
import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import NuevoPrecio from "../components/NuevoPrecio/NuevoPrecio";
export default function Home() {
  const [infoFechasVencimientos, setInfoFechasVencimientos] = useState([]);

  return (
    <>
      <Filtros setInfoFechasVencimientos={setInfoFechasVencimientos} />
      <TablaPrincipal infoFechasVencimientos={infoFechasVencimientos} />
      <NuevoPrecio />
    </>
  );
}
