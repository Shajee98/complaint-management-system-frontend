import { AxiosResponse } from "axios";

export const catchAxiosError = async (func: Promise<AxiosResponse<any, any>>) => {
    try {
      const response = await func
      return response
    } catch (error: any) {
      console.log(error, 'errror from catchAxios');
      const message =
        error?.response?.data?.error?.message || 'Something went wrong'
      throw new Error(message);
    }
  }  