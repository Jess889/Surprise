import React from 'react';
import './Home.css'; // Reutilizamos los estilos de Home

function HomeLoggedIn({ onLogout }) {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>¡Bienvenido de nuevo a Surprise!</h1>
        <p>Gracias por iniciar sesión. Explora más productos únicos y personalizados.</p>
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

      {/* Sección de productos */}
      <section className="products-section">
        <h2>Productos Destacados</h2>
        <div className="products">
          <div className="product">
            <h3>Producto 1</h3>
            <p>Descripción breve del producto 1.</p>
          </div>
          <div className="product">
            <h3>Producto 2</h3>
            <p>Descripción breve del producto 2.</p>
          </div>
          <div className="product">
            <h3>Producto 3</h3>
            <p>Descripción breve del producto 3.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeLoggedIn;
