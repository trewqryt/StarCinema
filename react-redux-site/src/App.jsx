import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import Login from './components/Login'
import Register from './components/Register'
import ProfilePage from './pages/ProfilePage'
import FavoritesPage from './pages/FavoritesPage'
import './styles/theme.css'



// Добавь в Routes:

function App() {
  useEffect(() => {
    document.body.className = 'dark-theme'
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App