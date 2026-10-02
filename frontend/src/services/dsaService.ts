import api from './api'

export interface AlgorithmData {
  id: number
  title: string
  description: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  starterCode?: string
  solutionCode?: string
  sampleInput?: string
  sampleOutput?: string
  explanation?: string
}

export interface DSASolutionData {
  id: number
  algorithmId: number
  submittedCode: string
  language: string
  status: string
  aiFeedback: string
  output?: string
  timeComplexity?: string
  spaceComplexity?: string
  submittedAt?: string
}

export const dsaService = {
  getAlgorithms: async (): Promise<AlgorithmData[]> => {
    const response = await api.get<AlgorithmData[]>('/api/dsa/algorithms')
    return response.data
  },
  getAlgorithmById: async (id: number): Promise<AlgorithmData> => {
    const response = await api.get<AlgorithmData>(`/api/dsa/algorithms/${id}`)
    return response.data
  },
  submitSolution: async (algorithmId: number, code: string, language: string): Promise<DSASolutionData> => {
    const response = await api.post<DSASolutionData>('/api/dsa/solve', { algorithmId, code, language })
    return response.data
  },
}

export default dsaService
