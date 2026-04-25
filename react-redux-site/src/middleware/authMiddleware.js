// Middleware для авторизации
export const authMiddleware = (store) => (next) => (action) => {
    const result = next(action)
    
    // Логирование действий
    if (action.type === 'auth/loginUser') {
      console.log('🔐 Попытка входа:', action.payload.email)
    }
    
    if (action.type === 'auth/registerUser') {
      console.log('📝 Регистрация нового пользователя:', action.payload.email)
    }
    
    if (action.type === 'auth/loginUser/fulfilled') {
      console.log('✅ Пользователь авторизован')
    }
    
    if (action.type === 'auth/logout') {
      console.log('👋 Пользователь вышел из системы')
    }
    
    return result
  }
  
  // Функция для проверки авторизации (защита маршрутов)
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token')
  }
  
  // Получение текущего пользователя
  export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }