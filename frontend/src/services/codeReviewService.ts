import api from './api'

export interface FunctionExplanation {
  functionName: string
  explanation: string
  parameters: string
  returnType: string
}

export interface Bug {
  description: string
  location: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  fix: string
}

export interface Improvement {
  description: string
  location: string
  suggestion: string
  impact: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface CodeReview {
  id: number
  code: string
  language: string
  functionExplanations: FunctionExplanation[]
  bugsFound: Bug[]
  improvements: Improvement[]
  timeComplexity: Record<string, string>
  spaceComplexity: Record<string, string>
  optimizedCode: string
  cleanerImplementation: string
  overallSummary: string
  createdAt: string
}

export interface CodeReviewRequest {
  code: string
  language: 'JAVA' | 'PYTHON' | 'CPP' | 'JAVASCRIPT'
}

export const codeReviewService = {
  reviewCode: async (request: CodeReviewRequest): Promise<CodeReview> => {
    const response = await api.post('/code-review/review', request)
    return response.data
  },

  getCodeReviewHistory: async (): Promise<CodeReview[]> => {
    const response = await api.get('/code-review/history')
    return response.data
  },

  getCodeReview: async (reviewId: number): Promise<CodeReview> => {
    const response = await api.get(`/code-review/${reviewId}`)
    return response.data
  },

  deleteCodeReview: async (reviewId: number): Promise<void> => {
    await api.delete(`/code-review/${reviewId}`)
  },
}
