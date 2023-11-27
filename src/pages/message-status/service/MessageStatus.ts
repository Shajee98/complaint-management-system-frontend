import {getRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getAllStatuses = () => {
  return catchAxiosError(getRequest(`${API_URL}/whatsapp/message-status/get/all`))
}