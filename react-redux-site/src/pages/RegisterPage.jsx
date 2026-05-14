import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, clearError } from '../redux/slices/authSlice'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, validationErrors, isAuthenticated } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' })

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const checkPasswordStrength = (password) => {
    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[!@#$%^&*]/.test(password)) score++
    let message = score <= 2 ? 'Слабый пароль' : score <= 4 ? 'Средний пароль' : 'Сильный пароль 💪'
    return { score, message }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (error) dispatch(clearError())
    if (name === 'password') setPasswordStrength(checkPasswordStrength(value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData))
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-large">
        <h2>📝 Регистрация</h2>
        <p>Создайте аккаунт чтобы начать</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Имя *" value={formData.name}
              onChange={handleChange} className={validationErrors.name ? 'error' : ''} required />
            {validationErrors.name && <span className="field-error">{validationErrors.name}</span>}
          </div>
          
          <div className="form-group">
            <input type="email" name="email" placeholder="Email *" value={formData.email}
              onChange={handleChange} className={validationErrors.email ? 'error' : ''} required />
            {validationErrors.email && <span className="field-error">{validationErrors.email}</span>}
          </div>
          
          <div className="form-group">
            <div className="password-input">
              <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Пароль *"
                value={formData.password} onChange={handleChange}
                className={validationErrors.password ? 'error' : ''} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordStrength.message && (
              <div className={`password-strength level-${passwordStrength.score}`}>
                <div className="strength-bar"><div className="strength-fill"></div></div>
                <span>{passwordStrength.message}</span>
              </div>
            )}
            {validationErrors.password && <span className="field-error">{validationErrors.password}</span>}
            <div className="password-requirements">
              <small>Пароль должен содержать:</small>
              <ul>
                <li className={formData.password.length >= 6 ? 'valid' : ''}>✓ Минимум 6 символов</li>
                <li className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>✓ Заглавную букву</li>
                <li className={/[a-z]/.test(formData.password) ? 'valid' : ''}>✓ Строчную букву</li>
                <li className={/[0-9]/.test(formData.password) ? 'valid' : ''}>✓ Цифру</li>
                <li className={/[!@#$%^&*]/.test(formData.password) ? 'valid' : ''}>✓ Спецсимвол (!@#$%^&*)</li>
              </ul>
            </div>
          </div>
          
          <div className="form-group">
            <div className="password-input">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Подтвердите пароль *"
                value={formData.confirmPassword} onChange={handleChange}
                className={validationErrors.confirmPassword ? 'error' : ''} required />
              <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {validationErrors.confirmPassword && <span className="field-error">{validationErrors.confirmPassword}</span>}
          </div>
          
          {error && <div className="error-message">⚠️ {error}</div>}
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
