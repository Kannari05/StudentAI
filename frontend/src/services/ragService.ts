import api from './api'

export interface DocumentItemData {
  id: number
  filename: string
  fileType: string
  fileSize: number
  status: string
  uploadedAt?: string
}

export const ragService = {
  uploadDocument: async (filename: string, content: string): Promise<DocumentItemData> => {
    const response = await api.post<DocumentItemData>('/api/rag/upload', { filename, content })
    return response.data
  },
  getDocuments: async (): Promise<DocumentItemData[]> => {
    const response = await api.get<DocumentItemData[]>('/api/rag/documents')
    return response.data
  },
  queryRAG: async (query: string): Promise<{ query: string; answer: string }> => {
    const response = await api.post<{ query: string; answer: string }>('/api/rag/query', { query })
    return response.data
  },
}

export default ragService
