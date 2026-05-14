import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { validateCredentials, validateRegistration, checkUserExists, generateToken } from '../middleware/authMiddleware'

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const validation = validateCredentials(email, password)
    
    if (!validation.isValid) {
      return rejectWithValue(validation.errors)
    }
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email)
        
        if (!user) {
          reject({ general: 'Пользователь с таким email не найден' })
        } else if (user.password !== password) {
          reject({ general: 'Неверный пароль' })
        } else {
          const token = generateToken()
          localStorage.setItem('token', token)
          localStorage.setItem('currentUser', JSON.stringify(user))
          
          resolve({
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            token
          })
        }
      }, 1000)
    })
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, confirmPassword }, { rejectWithValue }) => {
    const validation = validateRegistration(name, email, password, confirmPassword)
    
    if (!validation.isValid) {
      return rejectWithValue(validation.errors)
    }
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        if (checkUserExists(email, users)) {
          reject({ general: 'Пользователь с таким email уже существует' })
          return
        }
        
        const newUser = {
          id: Date.now(),
          name: name.trim(),
          email: email.toLowerCase(),
          password: password,
          role: 'user',
          createdAt: new Date().toISOString()
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        const token = generateToken()
        localStorage.setItem('token', token)
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        
        resolve({
          user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
          token
        })
      }, 1000)
    })
  }
)

export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('currentUser')
    
    if (!token || !user) {
      return rejectWithValue(null)
    }
    
    return { user: JSON.parse(user), token }
  }
)

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  validationErrors: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      state.validationErrors = {}
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
    },
    clearError: (state) => {
      state.error = null
      state.validationErrors = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.validationErrors = {}
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.general || 'Ошибка входа'
        state.validationErrors = action.payload || {}
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.validationErrors = {}
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.general || 'Ошибка регистрации'
        state.validationErrors = action.payload || {}
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user
          state.token = action.payload.token
          state.isAuthenticated = true
        }
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer