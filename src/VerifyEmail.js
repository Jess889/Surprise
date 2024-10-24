import React, { useState } from 'react';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleVerify = async (event) => {
    event.preventDefault();

    const response = await fetch('/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    });

    if (response.ok) {
      alert('Correo verificado correctamente.');
      // Aquí podrías redirigir al usuario a otra página
    } else {
      alert('Token inválido o correo no registrado.');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingrese su correo electrónico"
        required
      />
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Ingrese el token"
        required
      />
      <button type="submit">Verificar Correo</button>
    </form>
  );
};

export default VerifyEmail;