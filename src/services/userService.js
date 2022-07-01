import axios from "axios";
import { accountsUrl } from "../config/urls";

axios.defaults.baseURL = accountsUrl

const responseBody = response => response.data

// const queryToken = localStorage.getItem("user") ? `?token=${JSON.parse(localStorage.getItem("user").token)}` : ''

const methods = {
    logIn: (loginValues) => axios.post(`/login`, loginValues).then(responseBody),
    register: (registerValues) => axios.post('/register', registerValues).then(responseBody)
}

export default methods