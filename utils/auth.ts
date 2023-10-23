import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axios/axios";
import axiosClientFormData from "../config/axios/axiosFormData";

export const getRequest = async (url: string) => {
  try {
    // const user = JSON.parse(localStorage.getItem('user') as string)
    
    const response = await axiosClient.get(url, 
    // user ? {
    //   headers: {
    //     'Authorization': `Bearer ${user.jwtToken}`
    //   }
    // }:{}
    );
    console.log(
      'response from get request...', response
    )
    return response;
  } catch (error: any) {
    console.log('error from getting response error...', error)
    throw new Error(error || 'Something went wrong');
  }
}

export const postRequest = async (url: string, data?: any, options?: any) => {
  try {
    if (options)
    {
      const response = await axiosClient.post(url, data, options);
      console.log('response from post request...', response)
      return response;      
    }
    const response = await axiosClient.post(url, data);
    console.log('response from post request...', response)
    return response;
    
  } catch (error: any) {
    throw new Error(error?.response?.data?.error?.message || 'Something went wrong');
  }
}
export const postRequestFormData = async (url: string, data?: any, options?: any) => {
  try {
    if (options)
    {
      
      console.log("data ===> ", data)
      const response = await axiosClientFormData.post(url, data, {
        headers: options
      });
      console.log('response from post request...', response)
      return response;      
    }
    const response = await axiosClientFormData.post(url, data);
    console.log('response from post request...', response)
    return response;
    
  } catch (error: any) {
    console.log("error aagya ======> ", error)
    // if (error.response.data.status.code == 401)
    // {
    //   window.location.href == "/"
    // }
    throw new Error(error || 'Something went wrong');
  }
}

