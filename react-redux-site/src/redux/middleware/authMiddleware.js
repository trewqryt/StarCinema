// Middleware для авторизации
export const authMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    
    // Логирование действий авторизации
    if (action.type === 'auth/login/pending') {
      console.log('🔐 Попытка входа:', action.meta.arg.email)
    }
    
    if (action.type === 'auth/login/fulfilled') {
      console.log('✅ Пользователь успешно вошел:', action.payload.user.email)
      localStorage.setItem('lastLogin', new Date().toISOString())
    }
    
    if (action.type === 'auth/login/rejected') {
      console.log('❌ Ошибка входа:', action.payload)
    }
    
    if (action.type === 'auth/register/fulfilled') {
      console.log('📝 Новый пользователь зарегистрирован:', action.payload.user.email)
    }
    
    if (action.type === 'auth/logout') {
      console.log('👋 Пользователь вышел из системы')
      localStorage.removeItem('lastLogin')
    }
    
    return result
  }
  
  // Кастомная проверка логина и пароля
  export const validateCredentials = (email, password) => {
    const errors = {}
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!email) {
      errors.email = 'Email обязателен'
    } else if (!emailRegex.test(email)) {
      errors.email = 'Неверный формат email (пример: user@mail.com)'
    }
    
    if (!password) {
      errors.password = 'Пароль обязателен'
    } else if (password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов'
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Пароль должен содержать хотя бы одну заглавную букву'
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Пароль должен содержать хотя бы одну строчную букву'
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Пароль должен содержать хотя бы одну цифру'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  // Кастомная проверка регистрации
  export const validateRegistration = (name, email, password, confirmPassword) => {
    const errors = {}
    
    if (!name || name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа'
    } else if (name.trim().length > 50) {
      errors.name = 'Имя не должно превышать 50 символов'
    }
    
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
    if (!email) {
      errors.email = 'Email обязателен'
    } else if (!emailRegex.test(email)) {
      errors.email = 'Неверный формат email (пример: user@mail.com)'
    }
    
    if (!password) {
      errors.password = 'Пароль обязателен'
    } else if (password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов'
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Пароль должен содержать заглавную букву'
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Пароль должен содержать строчную букву'
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Пароль должен содержать цифру'
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Пароль должен содержать спецсимвол (!@#$%^&*)'
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают'
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    }
  }
  
  export const checkUserExists = (email, users) => {
    return users.some(user => user.email.toLowerCase() === email.toLowerCase())
  }
  
  export const generateToken = () => {
    return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2)
  }