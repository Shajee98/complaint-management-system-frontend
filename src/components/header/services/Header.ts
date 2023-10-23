import { catchAxiosError } from '../../../../utils/axios'
import { API_URL } from '../../../../utils/apiConfig'
import { postRequest } from '../../../../utils/auth'

export const userLogout = () => {
    return catchAxiosError(postRequest(`${API_URL}/users/session/logout`))
  }