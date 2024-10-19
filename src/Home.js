import React from 'react';
import './RegisterForm.css';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>¡Bienvenido a Surprise!</h1>
        <p>Descubre regalos únicos y personalizados para cada ocasión.</p>
        <button className="explore-button">Explora nuestros productos</button>
      </section>
      <section className="features-section">
        <h2>¿Por qué elegir Surprise?</h2>
        <div className="features">
          <div className="feature">
            <h3>Productos Personalizados</h3>
            <p>Cada regalo está hecho a tu medida, con el toque perfecto para sorprender a tus seres queridos.</p>
          </div>
          <div className="feature">
            <h3>Calidad Garantizada</h3>
            <p>Usamos los mejores materiales para crear regalos que perduran en el tiempo.</p>
          </div>
          <div className="feature">
            <h3>Envío Rápido</h3>
            <p>Recibe tu pedido a tiempo, en cualquier parte del país, con nuestra logística eficiente.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
