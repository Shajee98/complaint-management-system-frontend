import { catchAxiosError } from '../../../../../utils/axios'
import { API_URL } from '../../../../../utils/apiConfig'
import { getRequest } from '../../../../../utils/auth'

export const getAllDeptStaffs = (data: any) => {
  return catchAxiosError(getRequest(`${API_URL}/users/department/get/all/${data}`))
}

export const getAllStatuses = () => {
    return catchAxiosError(getRequest(`${API_URL}/users/statuses/get/all`))
}

export const getAllDepartments = () => {
  return catchAxiosError(getRequest(`${API_URL}/departments/get/all`))
}

export const getComplaintTypes = () => {
  return catchAxiosError(getRequest(`${API_URL}/users/complaint-types/get/all`))
}