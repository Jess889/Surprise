// src/QuienesSomos.js
import React from 'react';
import './QuienesSomos.css'; // Asegúrate de tener este archivo

function QuienesSomos() {
  return (
    <div className="quienes-somos-container">
      <h1>¿Quiénes Somos?</h1>
      <div className="boxes-container">
        <section className="mision-section box">
          <h2>Misión</h2>
          <p>
            Nuestra misión es ofrecer regalos únicos y personalizados que 
            transmitan emociones y fortalezcan los lazos entre las personas.
          </p>
        </section>

        <section className="vision-section box">
          <h2>Visión</h2>
          <p>
            Ser la empresa líder en el mercado de regalos personalizados, 
            reconocida por nuestra calidad, innovación y compromiso con nuestros clientes.
          </p>
        </section>

        <section className="politicas-section box">
          <h2>Políticas de la Empresa</h2>
          <ul>
            <li>Compromiso con la calidad en todos nuestros productos.</li>
            <li>Respeto por el medio ambiente en nuestras operaciones.</li>
            <li>Atención al cliente excepcional, buscando siempre la satisfacción.</li>
            <li>Innovación constante en nuestros productos y servicios.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default QuienesSomos;