import axios from "axios";
import { apiUrl } from "../config/urls";

axios.defaults.baseURL = apiUrl;

const responseBody = (response) => response.data;

const methods = {
  getRequests: () => axios.get("/Chat/requests").then(responseBody),
  sendJoinRequest: (payload) =>
    axios.post("Chat/requests/join-request", payload).then(responseBody),
  getRoomsForWhichRequestExist:() => axios.get("/request/request-rooms").then(responseBody),
  getCusotmersForSpecificRequestRoom:(id) => axios.get(`/request/room-customers?id=${id}`).then(responseBody)
};

export default methods;
