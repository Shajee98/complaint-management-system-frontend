import { catchAxiosError } from '../../../../../utils/axios'
import { API_URL } from '../../../../../utils/apiConfig'
import { getRequest, postRequest } from '../../../../../utils/auth'

export const getAllDeptStaffs = (data: any) => {
  return catchAxiosError(getRequest(`${API_URL}/users/department/get/all/${data}`))
}

export const getAllStatuses = () => {
    return catchAxiosError(getRequest(`${API_URL}/complaints/statuses/get/all`))
}

export const getAllDepartments = () => {
  return catchAxiosError(getRequest(`${API_URL}/departments/get/all`))
}

export const getComplaintById = (id: any) => {
    return catchAxiosError(getRequest(`${API_URL}/complaints/get/${id}`))
  }

export const getComplaintTypes = () => {
    return catchAxiosError(getRequest(`${API_URL}/users/complaint-types/get/all`))
  }

export const updateComplaint = (complaintId: number | undefined, payload: any, options: any) => {
  return catchAxiosError(postRequest(`${API_URL}/complaints/update-complaint/${complaintId}`, payload, options))
}