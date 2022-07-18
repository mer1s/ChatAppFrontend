import axios from "axios";
import { apiUrl } from "../config/urls";

axios.defaults.baseURL = apiUrl;

const responseBody = (response) => response.data;

const methods = {
  getChats: () => axios.get("/Chat").then(responseBody),
  createChat: (payload) => axios.post("/Chat", payload).then(responseBody),
};

export default methods;
