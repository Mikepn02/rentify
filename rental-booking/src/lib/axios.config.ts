import axios from "axios";
import { getCookie } from "./utils";

const token = getCookie("token");

console.log("Here is token: ", token)

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default axiosInstance;
