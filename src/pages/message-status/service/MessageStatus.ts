import {getRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getAllStatuses = () => {
  return catchAxiosError(getRequest(`${API_URL}/private/whatsapp/message-status/get/all`))
}