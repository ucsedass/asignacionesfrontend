import Filtros from "../components/Filtros/Filtros";
import TablaPrincipal from "../components/TablaPrincipal/TablaPrincipal";
import NuevoPrecio from "../components/NuevoPrecio/NuevoPrecio";
export default function Home() {
  return (
    <>
      <Filtros />
      <TablaPrincipal />
      <NuevoPrecio />
    </>
  );
}
