import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:4468",
});

/*const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL, //"https://localhost:44364",//"http://devmetc.tribcuentas.gov.ar", //"https://localhost:44364"//"http://ng01.tribcuentas.gov.ar:8080"
});*/

//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
//mod
export default clienteAxios;
