import {getRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getWhatsappResponsesCount = () => {
  return catchAxiosError(getRequest(`${API_URL}/whatsapp/YesOrNoCount`))
}

export const fetchComplaintsByMonth = (status_id: number) => {
  return catchAxiosError(getRequest(`${API_URL}/complaints/month/get/all?status_id=${status_id}`))
}