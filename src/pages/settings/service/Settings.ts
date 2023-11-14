import {getRequest, postRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getWhatsappMessageFormat = () => {
    return catchAxiosError(getRequest(`${API_URL}/whatsapp/get/whatsapp-message`))
  }

export const updateWhatsappMessageFormat = (message: string) => {
    return catchAxiosError(postRequest(`${API_URL}/whatsapp/set/whatsapp-message`, {message: message}))
}