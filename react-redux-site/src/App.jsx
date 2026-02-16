import React from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <Home />
        <Footer />
      </div>
    </Provider>
  )
}

export default App