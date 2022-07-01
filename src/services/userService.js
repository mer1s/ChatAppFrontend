import axios from "axios";
import { apiUrl } from "../config/urls";

axios.defaults.baseURL = apiUrl

const responseBody = response => response.data

// const queryToken = localStorage.getItem("user") ? `?token=${JSON.parse(localStorage.getItem("user").token)}` : ''

const methods = {
    logIn: (loginValues) => axios.post(`/Customer/login`, loginValues).then(responseBody).catch(e => console.log("OVDE JE GRESKA")),
    register: (registerValues) => axios.post('/Customer/register', registerValues).then(responseBody)
}

export default methods