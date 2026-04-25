import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser, setLoading, setError, clearError } from '../features/auth/authSlice'
import '../styles/auth.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) dispatch(clearError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      dispatch(setError('Заполните все поля'))
      return
    }
    
    dispatch(setLoading(true))
    dispatch(clearError())
    
    // Имитация задержки
    setTimeout(() => {
      dispatch(loginUser({ email: formData.email, password: formData.password }))
      dispatch(setLoading(false))
      
      // Проверяем ошибку после dispatch
      setTimeout(() => {
        const state = dispatch((_, getState) => getState())
        // Не можем так сделать, поэтому используем useSelector в эффекте
      }, 100)
    }, 1000)
  }

  // Отслеживаем изменение isAuthenticated
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  React.useEffect(() => {
    if (isAuthenticated) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }
      navigate('/profile')
    }
  }, [isAuthenticated, navigate, rememberMe, formData.email])

  // Загрузка запомненного email
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>🔐 Вход в аккаунт</h2>
          <p>Добро пожаловать обратно!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <div className="input-icon">
              <span className="icon">📧</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                autoComplete="email"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="current-password"
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Запомнить меня</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Забыли пароль?
            </Link>
          </div>
          
          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner-small"></span>
            ) : (
              'Войти'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </p>
        </div>
        
        <div className="auth-demo">
          <p>Демо-аккаунт для теста:</p>
          <button 
            onClick={() => {
              setFormData({
                email: 'demo@example.com',
                password: 'Demo123'
              })
            }}
            className="demo-button"
          >
            Заполнить демо-данные
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login