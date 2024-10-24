import React from 'react';
import './Footer.css'; // Asegúrate de tener un archivo CSS para el footer

function Footer() {
  return (
    <footer className="info-bar">
      <div className="info-content">
        <div className="info-section company-info">
          <h3>Información de la Empresa</h3>
          <p>Contactos: info@surprise.com</p>
          <p>Teléfono: (123) 456-7890</p>
        </div>
        <div className="info-section social-links">
          <h3>Redes Sociales</h3>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
        <div className="info-section location-info">
          <h3>Ubicación</h3>
          <p>Calle Ejemplo 123, Ciudad, País</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;