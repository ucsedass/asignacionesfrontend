import React, { useState, useEffect } from "react";
import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  const [infoConceptosConfiguracion, setInfoConceptosConfiguracion] = useState(
    []
  );

  const [idPeriodoAcademico, setIdPeriodoAcademico] = useState(0);
  const [refrescar, setRefrescar] = useState(false);

  return (
    <>
      <Filtros
        setInfoConceptosConfiguracion={setInfoConceptosConfiguracion}
        setIdPeriodoAcademico={setIdPeriodoAcademico}
        idPeriodoAcademico={idPeriodoAcademico}
        refrescar={refrescar}
      />
      <TablaPrincipal
        infoConceptosConfiguracion={infoConceptosConfiguracion}
        idPeriodoAcademico={idPeriodoAcademico}
        setRefrescar={setRefrescar}
        refrescar={refrescar}
      />
    </>
  );
}
