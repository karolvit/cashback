import axios from "axios";

const apiAcai = axios.create({
  baseURL: "http://server.celebreprojetos.com.br:65531",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAcai;
