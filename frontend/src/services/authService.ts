import api from './api'

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  email: string
  password: string
}

export interface AuthResponseData {
  token: string
  tokenType: string
  userId: number
  username: string
  email: string
  role: string
}

export const authService = {
  sendOtp: async (identifier: string): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/otp/send', { identifier })
    return response.data
  },
  verifyOtp: async (identifier: string, otp: string): Promise<AuthResponseData> => {
    const response = await api.post<AuthResponseData>('/api/auth/otp/verify', { identifier, otp })
    return response.data
  },

  login: async (
    credentials: LoginParams
  ): Promise<AuthResponseData> => {

    const response = await api.post<AuthResponseData>(
      '/api/auth/login',
      credentials
    )

    return response.data
  },

  register: async (
    userData: RegisterParams
  ): Promise<AuthResponseData> => {

    const response = await api.post<AuthResponseData>(
      '/api/auth/register',
      userData
    )

    return response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  },

}

export default authService