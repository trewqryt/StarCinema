import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { store } from './redux/store'
import { checkAuth } from './redux/slices/authSlice'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailPage from './pages/MovieDetailPage'
import FavoritesPage from './pages/FavoritesPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/global.css'

const AppContent = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.ui)

  useEffect(() => {
    dispatch(checkAuth())
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme'
  }, [dispatch, theme])

  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

export default App