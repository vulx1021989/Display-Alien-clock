import axios from "axios";

let BaseApi = axios.create({
    baseURL: "http://localhost:8888/api",
});

var token = localStorage.getItem("token");

if (token) {
    BaseApi.defaults.headers.common['Authorization']  = 'Bearer '+ token;
}

// Api.defaults.withCredentials = true;

export default BaseApi;
