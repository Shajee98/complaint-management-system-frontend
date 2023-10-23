import axios from 'axios'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'
import { postRequest } from '../../../../utils/auth'

export const userSignIn = (data: any) => {
  return catchAxiosError(postRequest(`${API_URL}/session/login`, data))
}