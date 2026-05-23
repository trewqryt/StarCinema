import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/slices/authSlice'
import './RegisterPage.css'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')

  const checkPasswordStrength = (pass) => {
    let score = 0
    if (pass.length >= 6) score++
    if (/[A-Z]/.test(pass)) score++
    if (/[a-z]/.test(pass)) score++
    if (/[0-9]/.test(pass)) score++
    
    if (score <= 2) setPasswordStrength('weak')
    else if (score <= 3) setPasswordStrength('medium')
    else setPasswordStrength('strong')
  }

  const handlePasswordChange = (e) => {
    const pass = e.target.value
    setPassword(pass)
    checkPasswordStrength(pass)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Пароли не совпадают')
      return
    }
    const result = await dispatch(registerUser({ name, email, password, confirmPassword }))
    if (result.payload?.user) {
      navigate('/')
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>📝 Регистрация</h2>
        <p>Создайте аккаунт</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Имя" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <input 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
          
          {password && (
            <div className={`password-strength strength-${passwordStrength}`}>
              <div className="strength-bar">
                <div className="strength-fill"></div>
              </div>
              <span className="strength-text">
                {passwordStrength === 'weak' && 'Слабый пароль'}
                {passwordStrength === 'medium' && 'Средний пароль'}
                {passwordStrength === 'strong' && 'Сильный пароль'}
              </span>
            </div>
          )}

          <div className="password-requirements">
            <small>Пароль должен содержать:</small>
            <ul>
              <li className={password.length >= 6 ? 'valid' : ''}>минимум 6 символов</li>
              <li className={/[A-Z]/.test(password) ? 'valid' : ''}>заглавную букву</li>
              <li className={/[a-z]/.test(password) ? 'valid' : ''}>строчную букву</li>
              <li className={/[0-9]/.test(password) ? 'valid' : ''}>цифру</li>
            </ul>
          </div>
          
          <input 
            type="password" 
            placeholder="Подтвердите пароль" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
          
          {error && <div className="register-error">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
        
        <div className="register-footer">
          <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage