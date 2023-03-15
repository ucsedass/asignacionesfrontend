import React, { useState, useEffect } from "react";
import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import NuevoPrecio from "../components/NuevoPrecio/NuevoPrecio";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSafeLayoutEffect } from "@chakra-ui/react";
export default function Home() {
  const [infoFechasVencimientos, setInfoFechasVencimientos] = useState([]);
  const [infoConceptosConfiguracion, setInfoConceptosConfiguracion] = useState(
    []
  );
  const [codConcepto, setCodConcepto] = useState(0);
  const [idPeriodoAcademico, setIdPeriodoAcademico] = useState(0);
  const [refrescar, setRefrescar] = useState(false);

  return (
    <>
      <Filtros
        setInfoConceptosConfiguracion={setInfoConceptosConfiguracion}
        setInfoFechasVencimientos={setInfoFechasVencimientos}
        setCodConcepto={setCodConcepto}
        setIdPeriodoAcademico={setIdPeriodoAcademico}
        idPeriodoAcademico={idPeriodoAcademico}
        refrescar={refrescar}
      />
      <TablaPrincipal infoConceptosConfiguracion={infoConceptosConfiguracion} />
      <NuevoPrecio
        refrescar={refrescar}
        setRefrescar={setRefrescar}
        codConcepto={codConcepto}
        idPeriodoAcademico={idPeriodoAcademico}
      />
    </>
  );
}
