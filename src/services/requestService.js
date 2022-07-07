import axios from "axios";
import { apiUrl } from "../config/urls";

axios.defaults.baseURL = apiUrl;

const responseBody = (response) => response.data;

const methods = {
  getRequests: () => axios.get("/request").then(responseBody),
  sendJoinRequest: (payload) =>
    axios.post("/request/join-request", payload).then(responseBody),
  getRoomsForWhichRequestExist: () =>
    axios.get("/request/request-rooms").then(responseBody),
  getCusotmersForSpecificRequestRoom: (payload) =>
    axios.get(`/request/room-customers?id=${payload}`).then(responseBody),
  sendAcceptCustomerRequest: (payload) =>
    axios.post("/request/accept-request", payload).then(responseBody),
};

export default methods;
