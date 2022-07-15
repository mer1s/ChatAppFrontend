import axios from "axios";
import { apiUrl } from "../config/urls";

axios.defaults.baseURL = apiUrl;

const responseBody = (response) => response.data;

const methods = {
  getChats: (customerId) => axios.get(`/Chat/rooms-with-filtered-messages?customerId=${customerId}`).then(responseBody),
  createChat: (payload) => axios.post("/Chat", payload).then(responseBody),
  getSupportRooms:(supportId) => axios.get(`/Chat/support-rooms?supportId=${supportId}`).then(responseBody)
};

export default methods;
