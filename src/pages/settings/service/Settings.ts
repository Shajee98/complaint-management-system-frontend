import {getRequest, postRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getWhatsappMessageFormat = () => {
    return catchAxiosError(getRequest(`${API_URL}/whatsapp/get/whatsapp-message`))
  }

export const updateWhatsappMessageFormat = (message: string) => {
    return catchAxiosError(postRequest(`${API_URL}/whatsapp/set/whatsapp-message`, {message: message}))
}

export const getAllUsers = (user_department_id: any) => {
  return catchAxiosError(getRequest(`${API_URL}/users/get/all?user_department_id=${user_department_id}`))
}