import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'
import { getRequest, postRequest } from '../../../../utils/auth'

export const userSignUp = (data: any) => {
  return catchAxiosError(postRequest(`${API_URL}/user/auth/register`, data))
}

export const getAllDepartments = () => {
  return catchAxiosError(getRequest(`${API_URL}/departments/get/all`))
}

export const getUserTypes = () => {
  return catchAxiosError(getRequest(`${API_URL}/users/types/get/all`))
}

export const getCompanies = () => {
  return catchAxiosError(getRequest(`${API_URL}/users/complaint-types/get/all`))
}