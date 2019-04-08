import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:8780/",
  timeout: 120000
});

export default instance;
