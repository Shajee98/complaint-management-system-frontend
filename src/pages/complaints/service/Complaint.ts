import {getRequest} from '../../../../utils/auth'
import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'

export const getAllDepartments = () => {
  return catchAxiosError(getRequest(`${API_URL}/departments/get/all`))
}

export const getAllComplaints = (data: {offset: number, complaint_type_id: number, department_id: number | null, complaint_status_id: number}) => {
    return catchAxiosError(getRequest(`${API_URL}/complaints/get/all?offset=${data.offset}&department_id=${data.department_id}&complaint_type_id=${data.complaint_type_id}&complaint_status_id=${data.complaint_status_id}`))
}

export const getWhatsappResponsesCount = () => {
  return catchAxiosError(getRequest(`${API_URL}/whatsapp/YesOrNoCount`))
}

export const fetchComplaintsByMonth = (status_id: number) => {
  return catchAxiosError(getRequest(`${API_URL}/complaints/month/get/all?status_id=${status_id}`))
}