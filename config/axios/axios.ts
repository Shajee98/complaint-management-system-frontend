import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8000/api/v1`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: 100000,
    withCredentials: true
});

export default axiosClient