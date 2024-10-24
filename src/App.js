import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import RecoverPassword from './RecoverPassword';
import Footer from './Footer';
import Home from './Home'; // Home para usuarios no logueados
import HomeLoggedIn from './HomeLoggedIn'; // Home para usuarios logueados
import QuienesSomos from './QuienesSomos';
import logo from './images/Imagen_de_WhatsApp_2024-10-08_a_las_16.19.49_957b34e3-removebg-preview.png';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para la sesión del usuario

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false); // Cambiar el estado a falso al cerrar sesión
  };

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
              <h1 className="site-title">Surprise</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/quienes-somos">Quienes Somos</Link></li>
              <li><Link to="/contact">Contáctanos</Link></li>
              {/* Mostrar el botón de Cerrar Sesión al lado de Contáctanos si el usuario está logueado */}
              {isLoggedIn && (
                <li>
                  <button className="logout" onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              )}
            </ul>
            {!isLoggedIn && (
              <div className="auth-buttons">
                <Link to="/login">
                  <button className="login">Iniciar Sesión</button>
                </Link>
                <Link to="/register">
                  <button className="register">Regístrate</button>
                </Link>
              </div>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            {/* Redirigir a la nueva versión de Home si el usuario está logueado */}
            <Route path="/home" element={isLoggedIn ? <HomeLoggedIn onLogout={handleLogout} /> : <Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route 
              path="/login" 
              element={<LoginForm onLogin={handleLogin} />} 
            />
            <Route path="/recover" element={<RecoverPassword />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
