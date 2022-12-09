//CONFIGURANDO O AXIOS
//PRA ENVIAR JUNTO COM A REQUISIÇÃO O MEU TOKEN -> headers (cabeçalho)
import axios from "axios";

const apiURLs = {
  development: "http://localhost:8080",
  production: "https://turma92wd.cyclic.app",
};

//instancia que sabe qual é a BASEURL QUE DEVE SER USADA NAS REQUISIÇÕES DO AXIOS
const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

console.log(process.env);

api.interceptors.request.use((config) => {
  ///////////////////////
  //capturar o loggedInUser do localStorage  (lembrando que ele vem em formato de JSON)
  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  //transformando o json em uma OBJETO
  //JSON.parse(transforma o que está aqui dentro em um objeto)
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');
  //////////////////////

  if (parseLoggedInUser.token) {
    //SE houver um token -> coloca ele no cabeçalho da requisição como um Bearer Token
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }

  return config;
});

export default api;
