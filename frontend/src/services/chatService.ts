import api from './api'


export interface ChatMessageData {
  id?: number
  userId?: number
  sessionId?: string
  sender: 'USER' | 'AI'
  content: string
  timestamp?: string
}

export const chatService = {
  sendMessage: async (message: string, sessionId?: string, topic?: string): Promise<ChatMessageData> => {
    const response = await api.post<ChatMessageData>('/api/chat', { message, sessionId, topic })
    return response.data
  },
  getHistory: async (): Promise<ChatMessageData[]> => {
    const response = await api.get<ChatMessageData[]>('/api/chat/history')
    return response.data
  },
  getSessionMessages: async (sessionId: string): Promise<ChatMessageData[]> => {
    const response = await api.get<ChatMessageData[]>(`/api/chat/session/${sessionId}`)
    return response.data
  },
}

export default chatService
