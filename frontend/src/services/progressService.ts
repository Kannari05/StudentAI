import api from './api'

export interface ProgressUpdateRequest {
  activityType: 'ALGORITHM' | 'QUIZ' | 'CHAT' | 'PROGRAMMING_TUTOR' | 'RAG' | 'CODE_REVIEW'
  topic?: string
  durationMinutes?: number
  score?: number
  completed?: boolean
  notes?: string
}

export interface ProgressResponse {
  id: number
  userId: string
  date: string
  algorithmsCompleted: number
  quizScore: number
  studyMinutes: number
  weakTopics: string[]
  strongTopics: string[]
  dailyStreak: number
  createdAt: string
}

export interface ProgressSummaryResponse {
  totalAlgorithmsCompleted: number
  averageQuizScore: number
  totalStudyHours: number
  currentStreak: number
  weakTopics: string[]
  strongTopics: string[]
  weeklyProgress: Record<string, number>
  monthlyProgress: Record<string, number>
  activityBreakdown: Record<string, number>
}

export const progressService = {
  updateProgress: async (request: ProgressUpdateRequest): Promise<ProgressResponse> => {
    const response = await api.post('/progress/update', request)
    return response.data
  },

  getProgressSummary: async (): Promise<ProgressSummaryResponse> => {
    const response = await api.get('/progress/summary')
    return response.data
  },

  getProgressHistory: async (): Promise<ProgressResponse[]> => {
    const response = await api.get('/progress/history')
    return response.data
  },

  getTodayProgress: async (): Promise<ProgressResponse> => {
    const response = await api.get('/progress/today')
    return response.data
  },
}
