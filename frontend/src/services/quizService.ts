import api from './api'

export interface QuizQuestionData {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuizData {
  id: number
  topic: string
  difficulty: string
  questionsJson: string[]
}

export interface QuizAttemptData {
  id: number
  quizId: number
  totalQuestions: number
  correctAnswers: number
  scorePercentage: number
  feedback: string
  completedAt?: string
}

export const quizService = {
  getQuizzes: async (): Promise<QuizData[]> => {
    const response = await api.get<QuizData[]>('/api/quiz')
    return response.data
  },
  getQuizById: async (id: number): Promise<QuizData> => {
    const response = await api.get<QuizData>(`/api/quiz/${id}`)
    return response.data
  },
  submitAttempt: async (quizId: number, correctAnswers: number, totalQuestions: number): Promise<QuizAttemptData> => {
    const response = await api.post<QuizAttemptData>('/api/quiz/submit', { quizId, correctAnswers, totalQuestions })
    return response.data
  },
  getUserAttempts: async (): Promise<QuizAttemptData[]> => {
    const response = await api.get<QuizAttemptData[]>('/api/quiz/attempts')
    return response.data
  },
}

export default quizService
