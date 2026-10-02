import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: {
    id: number
    username: string
    email: string
    role: string
  } | null
  token: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState['user']; token: string }>
    ) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
      if (action.payload.user?.role) {
        localStorage.setItem('userRole', action.payload.user.role)
      }
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
