import axios from "axios";
import { useNavigate } from "react-router-dom";
const { url } = require('../config/index');

export const handleUserLoginApi = async (body) => {
    try {
        const response = await axios.post(`${url}/user/login`, body);
        localStorage.setItem("token", response?.data?.data?.token);
        return response?.data
    } catch (error) {
        console.log(error, "---logresponse");
        return error
    }
}
export const getUserDetailsApi = async (userId) => {
    try {
        const response = await axios.get(`${url}/user/getUserDetails/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
        });
        return response?.data
    } catch (error) {
        console.log(error, "---logresponse");
        return error
    }
}