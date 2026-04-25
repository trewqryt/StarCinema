import { createSlice } from '@reduxjs/toolkit'

// Вспомогательные функции
const generateToken = () => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36)
}

const validateEmail = (email) => {
  const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  return re.test(email)
}

const validatePassword = (password) => {
  const minLength = 6
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: password.length < minLength,
      noUpperCase: !hasUpperCase,
      noLowerCase: !hasLowerCase,
      noNumbers: !hasNumbers
    }
  }
}

// Функция для получения пользователей с админом по умолчанию
const getInitialUsers = () => {
  const savedUsers = localStorage.getItem('users')
  if (savedUsers) {
    return JSON.parse(savedUsers)
  }
  
  // Создаем админа по умолчанию при первом запуске
  return [
    {
      id: 1,
      email: 'admin@cinemahub.com',
      name: 'Администратор',
      phone: '+7 (999) 123-45-67',
      password: 'Admin123',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ]
}

const initialState = {
  user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  users: getInitialUsers()
}

// Сохраняем users в localStorage
const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users))
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    registerUser: (state, action) => {
      const { name, email, phone, password } = action.payload
      
      if (!validateEmail(email)) {
        state.error = 'Неверный формат email'
        state.loading = false
        return
      }
      
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        let errorMessage = 'Пароль должен содержать: '
        if (passwordValidation.errors.minLength) errorMessage += 'минимум 6 символов, '
        if (passwordValidation.errors.noUpperCase) errorMessage += 'заглавную букву, '
        if (passwordValidation.errors.noLowerCase) errorMessage += 'строчную букву, '
        if (passwordValidation.errors.noNumbers) errorMessage += 'цифру'
        state.error = errorMessage
        state.loading = false
        return
      }
      
      const existingUser = state.users.find(u => u.email === email)
      if (existingUser) {
        state.error = 'Пользователь с таким email уже существует'
        state.loading = false
        return
      }
      
      const newUser = {
        id: Date.now(),
        email,
        name: name || email.split('@')[0],
        phone: phone || '',
        password: password,
        role: 'user',
        createdAt: new Date().toISOString()
      }
      
      const token = generateToken()
      
      state.users.push(newUser)
      saveUsersToStorage(state.users)
      state.user = newUser
      state.token = token
      state.isAuthenticated = true
      state.error = null
      state.loading = false
      
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(newUser))
    },
    
    loginUser: (state, action) => {
      const { email, password } = action.payload
      
      if (!validateEmail(email)) {
        state.error = 'Неверный формат email'
        state.loading = false
        return
      }
      
      const user = state.users.find(u => u.email === email)
      
      if (!user) {
        state.error = 'Пользователь не найден'
        state.loading = false
        return
      }
      
      if (user.password !== password) {
        state.error = 'Неверный пароль'
        state.loading = false
        return
      }
      
      const token = generateToken()
      
      state.user = user
      state.token = token
      state.isAuthenticated = true
      state.error = null
      state.loading = false
      
      localStorage.setItem('token', token)
      localStorage.setItem('currentUser', JSON.stringify(user))
    },
    
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('currentUser')
    },
    
    updateProfile: (state, action) => {
      const updatedUser = { ...state.user, ...action.payload }
      state.user = updatedUser
      
      const userIndex = state.users.findIndex(u => u.id === state.user.id)
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser
        saveUsersToStorage(state.users)
      }
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    }
  }
})

export const {
  setLoading,
  setError,
  clearError,
  registerUser,
  loginUser,
  logout,
  updateProfile
} = authSlice.actions

export default authSlice.reducer