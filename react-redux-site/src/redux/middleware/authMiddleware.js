// Middleware для авторизации
export const authMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  
  if (action.type === 'auth/login/fulfilled') {
    console.log('✅ Успешный вход')
  }
  if (action.type === 'auth/register/fulfilled') {
    console.log('📝 Новый пользователь')
  }
  if (action.type === 'auth/logout') {
    console.log('👋 Выход из системы')
  }
  
  return result
}

// Валидация email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
  return re.test(email)
}

// Валидация пароля
export const validatePassword = (password) => {
  if (password.length < 6) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}

// Полная валидация для входа
export const validateCredentials = (email, password) => {
  const errors = {}
  
  if (!email) {
    errors.email = 'Email обязателен'
  } else if (!validateEmail(email)) {
    errors.email = 'Неверный формат email'
  }
  
  if (!password) {
    errors.password = 'Пароль обязателен'
  } else if (password.length < 6) {
    errors.password = 'Пароль должен быть минимум 6 символов'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Полная валидация для регистрации
export const validateRegistration = (name, email, password, confirmPassword) => {
  const errors = {}
  
  if (!name || name.trim().length < 2) {
    errors.name = 'Имя должно быть минимум 2 символа'
  }
  
  if (!email) {
    errors.email = 'Email обязателен'
  } else if (!validateEmail(email)) {
    errors.email = 'Неверный формат email'
  }
  
  if (!password) {
    errors.password = 'Пароль обязателен'
  } else if (password.length < 6) {
    errors.password = 'Пароль должен быть минимум 6 символов'
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Пароль должен содержать заглавную букву'
  } else if (!/[a-z]/.test(password)) {
    errors.password = 'Пароль должен содержать строчную букву'
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Пароль должен содержать цифру'
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Генерация токена
export const generateToken = () => {
  return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2)
}