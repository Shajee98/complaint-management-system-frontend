import {getRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getWhatsappResponsesCount = (complaint_type_id: number) => {
  return catchAxiosError(getRequest(`${API_URL}/private/whatsapp/YesOrNoCount?complaint_type_id=${complaint_type_id}`))
}

export const fetchComplaintsByMonth = (status_id: number, complaint_type_id: number) => {
  return catchAxiosError(getRequest(`${API_URL}/complaints/month/get/all?status_id=${status_id}&complaint_type_id=${complaint_type_id}`))
}