import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/slices/authSlice'
import './LoginPage.css'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (result.payload?.user) {
      navigate('/')
    }
  }

  const fillDemo = () => {
    setEmail('demo@example.com')
    setPassword('Demo123')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Sign in to your account</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#a0a0a0',
                cursor: 'pointer',
                fontSize: '14px',
                padding: 0,
                margin: 0,
                width: 'auto'
              }}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>

        <div className="demo-account">
          <p>🎬 Demo Account</p>
          <div className="demo-credentials">
            <code>demo@example.com</code>
            <code>Demo123</code>
          </div>
          <button type="button" className="demo-btn" onClick={fillDemo}>
            Fill demo credentials
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage