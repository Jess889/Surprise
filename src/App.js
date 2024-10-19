import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importa Routes y Link
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import RecoverPassword from './RecoverPassword';
import logo from './images/Imagen_de_WhatsApp_2024-10-08_a_las_16.19.49_957b34e3-removebg-preview.png'; // Cambia a la imagen correcta

function App() {
  return (
    <Router> {/* Envuelve todo en Router */}
      <div className="App">
        <header>
          <nav>
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
              <h1 className="site-title">Surprise</h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li> {/* Usa Link para navegación */}
              <li><Link to="/about">Quienes Somos</Link></li>
              <li><Link to="/contact">Contáctanos</Link></li>
            </ul>
            <div className="auth-buttons">
              <Link to="/login">
                <button className="login">Iniciar Sesión</button>
              </Link>
              <Link to="/register">
                <button className="register">Regístrate</button>
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes> {/* Cambia Switch a Routes */}
            <Route path="/" element={
              <section>
                <h2>¡Bienvenido a Surprise!</h2>
                <p>Explora nuestros regalos personalizados y exclusivos.</p>
              </section>
            } />
            <Route path="/register" element={<RegisterForm />} /> {/* Rutas con la nueva API */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/recover" element={<RecoverPassword />} />
            {/* Agrega más rutas según sea necesario */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
