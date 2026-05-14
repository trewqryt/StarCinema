import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, clearError } from '../redux/slices/authSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, validationErrors, isAuthenticated } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData))
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) dispatch(clearError())
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>🔐 Вход в аккаунт</h2>
        <p>Добро пожаловать обратно!</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" value={formData.email}
              onChange={handleChange} className={validationErrors.email ? 'error' : ''} required />
            {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Пароль"
                value={formData.password} onChange={handleChange}
                className={validationErrors.password ? 'error' : ''} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.password && <span className="field-error">{validationErrors.password}</span>}
          </div>
          
          {error && <div className="error-message">⚠️ {error}</div>}
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
        
        <div className="auth-demo">
          <p>📝 Демо-аккаунт:</p>
          <div className="demo-credentials">
            <code>Email: demo@example.com</code>
            <code>Пароль: Demo123!</code>
          </div>
          <button className="demo-btn" onClick={() => setFormData({ email: 'demo@example.com', password: 'Demo123!' })}>
            Заполнить демо-данные
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage