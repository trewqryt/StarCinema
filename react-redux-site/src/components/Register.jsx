import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser, setLoading, setError, clearError } from '../features/auth/authSlice'
import '../styles/auth.css'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Функция проверки силы пароля
  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      return { score: 0, message: '' }
    }
    
    let score = 0
    if (password.length >= 6) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++
    
    let message = ''
    if (score <= 2) {
      message = 'Слабый пароль'
      score = 1
    } else if (score <= 4) {
      message = 'Средний пароль'
      score = 2
    } else {
      message = 'Сильный пароль 💪'
      score = 3
    }
    
    return { score, message }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (error) dispatch(clearError())
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password) {
      dispatch(setError('Заполните все обязательные поля'))
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      dispatch(setError('Пароли не совпадают'))
      return
    }
    
    if (!agreedToTerms) {
      dispatch(setError('Подтвердите согласие с условиями'))
      return
    }
    
    dispatch(setLoading(true))
    dispatch(clearError())
    
    // Имитация задержки
    setTimeout(() => {
      dispatch(registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      }))
      dispatch(setLoading(false))
    }, 1000)
  }

  // Редирект после успешной регистрации
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <div className="auth-header">
          <h2>📝 Регистрация</h2>
          <p>Создайте аккаунт чтобы начать</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Имя *</label>
            <div className="input-icon">
              <span className="icon">👤</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Иван Иванов"
                autoComplete="name"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Email *</label>
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
            <label>Телефон</label>
            <div className="input-icon">
              <span className="icon">📱</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Пароль *</label>
            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Минимум 6 символов"
                autoComplete="new-password"
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordStrength.message && (
              <div className={`password-strength score-${passwordStrength.score}`}>
                <div className="strength-bar">
                  <div className={`strength-fill level-${passwordStrength.score}`}></div>
                </div>
                <span>{passwordStrength.message}</span>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Подтверждение пароля *</label>
            <div className="input-icon">
              <span className="icon">🔐</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <span>
                Я согласен с <Link to="/terms">условиями использования</Link> и 
                <Link to="/privacy"> политикой конфиденциальности</Link> *
              </span>
            </label>
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
              'Зарегистрироваться'
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register