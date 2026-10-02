import api from './api'

export interface UserUpdateRequest {
  username: string
  email: string
  role?: 'USER' | 'ADMIN'
  enabled?: boolean
}

export interface UserResponse {
  id: number
  username: string
  email: string
  role: string
  enabled: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminAnalyticsResponse {
  totalUsers: number
  activeUsers: number
  totalQuizzes: number
  totalAlgorithms: number
  totalDocuments: number
  totalCodeReviews: number
  userGrowth: Record<string, number>
  quizAttempts: Record<string, number>
  algorithmCompletions: Record<string, number>
  studyHours: Record<string, number>
  popularTopics?: Array<{ name: string; percentage: number }>
}

export const adminService = {
  // User Management
  getAllUsers: async (): Promise<UserResponse[]> => {
    const response = await api.get('/admin/users')
    return response.data
  },

  getUserById: async (id: number): Promise<UserResponse> => {
    const response = await api.get(`/admin/users/${id}`)
    return response.data
  },

  updateUser: async (id: number, request: UserUpdateRequest): Promise<UserResponse> => {
    const response = await api.put(`/admin/users/${id}`, request)
    return response.data
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/admin/users/${id}`)
  },

  // Analytics
  getAnalytics: async (): Promise<AdminAnalyticsResponse> => {
    const response = await api.get('/admin/analytics')
    return response.data
  },

  // Quiz Management
  getAllQuizzes: async (): Promise<any[]> => {
    const response = await api.get('/admin/quizzes')
    return response.data
  },

  deleteQuiz: async (id: number): Promise<void> => {
    await api.delete(`/admin/quizzes/${id}`)
  },

  // Progress Management
  getAllProgress: async (): Promise<any[]> => {
    const response = await api.get('/admin/progress')
    return response.data
  },
}
