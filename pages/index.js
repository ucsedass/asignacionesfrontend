import React, { useState, useEffect } from "react";
import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import NuevoPrecio from "../components/NuevoPrecio/NuevoPrecio";
export default function Home() {
  const [infoFechasVencimientos, setInfoFechasVencimientos] = useState([]);
  const [codConcepto, setCodConcepto] = useState(0);
  const [idPeriodoAcademico, setIdPeriodoAcademico] = useState(0);
  const [refrescar, setRefrescar] = useState(false);
  console.log("desde el index", codConcepto);
  console.log("refrescar:", refrescar);
  return (
    <>
      <Filtros
        setInfoFechasVencimientos={setInfoFechasVencimientos}
        setCodConcepto={setCodConcepto}
        setIdPeriodoAcademico={setIdPeriodoAcademico}
        idPeriodoAcademico={idPeriodoAcademico}
        refrescar={refrescar}
      />
      <TablaPrincipal infoFechasVencimientos={infoFechasVencimientos} />
      <NuevoPrecio
        refrescar={refrescar}
        setRefrescar={setRefrescar}
        codConcepto={codConcepto}
        idPeriodoAcademico={idPeriodoAcademico}
      />
    </>
  );
}
