import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { validateCredentials, validateRegistration, generateToken } from '../middleware/authMiddleware'

// Функция для получения пользователей с админом по умолчанию
const getDefaultUsers = () => {
  const savedUsers = localStorage.getItem('users')
  if (savedUsers) {
    return JSON.parse(savedUsers)
  }
  
  // Создаем админа по умолчанию при первом запуске
  return [
    {
      id: 1,
      name: 'Администратор',
      email: 'admin@example.com',
      password: 'Admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ]
}

// Асинхронный вход
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
          reject({ general: 'Пользователь не найден' })
        } else if (user.password !== password) {
          reject({ general: 'Неверный пароль' })
        } else {
          const token = generateToken()
          localStorage.setItem('token', token)
          localStorage.setItem('currentUser', JSON.stringify(user))
          resolve({ 
            user: { 
              id: user.id, 
              name: user.name, 
              email: user.email, 
              role: user.role || 'user' 
            }, 
            token 
          })
        }
      }, 800)
    })
  }
)

// Асинхронная регистрация
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
        
        if (users.some(u => u.email === email)) {
          reject({ general: 'Пользователь с таким email уже существует' })
          return
        }
        
        // Проверка: если email admin@example.com, то роль admin
        const isAdmin = email === 'admin@example.com'
        
        const newUser = {
          id: Date.now(),
          name: name.trim(),
          email: email.toLowerCase(),
          password: password,
          role: isAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString()
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        const token = generateToken()
        localStorage.setItem('token', token)
        localStorage.setItem('currentUser', JSON.stringify(newUser))
        
        resolve({ 
          user: { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email, 
            role: newUser.role 
          }, 
          token 
        })
      }, 800)
    })
  }
)

// Проверка авторизации
export const checkAuth = createAsyncThunk('auth/check', async () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('currentUser')
  if (token && user) {
    const parsedUser = JSON.parse(user)
    return { 
      user: { 
        id: parsedUser.id, 
        name: parsedUser.name, 
        email: parsedUser.email, 
        role: parsedUser.role || 'user' 
      }, 
      token 
    }
  }
  return null
})

// Инициализация начального состояния с админом
const getInitialState = () => {
  const users = getDefaultUsers()
  // Сохраняем админа в localStorage если его там нет
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users))
  }
  
  return {
    user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    validationErrors: {}
  }
}

const initialState = getInitialState()

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
      // Login
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
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.general || 'Ошибка входа'
        state.validationErrors = action.payload || {}
      })
      // Register
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
        state.error = null
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