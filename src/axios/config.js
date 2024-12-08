import axios from "axios";

const apiAcai = axios.create({
  baseURL: "http://celebreserver.ddns.net:65530",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAcai;
