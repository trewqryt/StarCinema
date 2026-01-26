// src/App.jsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';


function App() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <Header />
      
      <main>
        <Home />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;