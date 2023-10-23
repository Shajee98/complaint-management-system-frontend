import axios from 'axios'
import { catchAxiosError } from '../../../../../utils/axios'
import { API_URL } from '../../../../../utils/apiConfig'
import { getRequest, postRequest } from '../../../../../utils/auth'

export const getComments = (data: any) => {
  return catchAxiosError(getRequest(`${API_URL}/complaints/comments/get/all/?complaint_id=${data.complaint_id}`))
}

export const addComment = (data: any) => {
    return catchAxiosError(postRequest(`${API_URL}/complaints/comments/add`, data))
}