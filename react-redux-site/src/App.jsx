import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AdminPage from './pages/AdminPage'
import './styles/theme.css'

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
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App