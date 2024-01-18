import axios from 'axios';


const axiosClientFormData = axios.create({
    baseURL: `http://10.1.10.18:8000/api/v1`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',

    },
    timeout: 100000,
    withCredentials: true
});

export default axiosClientFormData