import { AxiosResponse } from "axios";

export const catchAxiosError = async (func: Promise<AxiosResponse<any, any>>) => {
    try {
      const response = await func
      return response
    } catch (error: any) {
      console.log('errror from catchAxios', error.message);
      const message =
        error.message || 'Something went wrong'
      console.log("message ===> ", message)
      throw new Error(message);
    }
  }  