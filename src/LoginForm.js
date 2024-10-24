import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css'; // Mantén tu CSS

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup.string().email('Correo electrónico no válido').required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

function LoginForm({ onLogin }) {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const [modalMessage, setModalMessage] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showRecoverPassword, setShowRecoverPassword] = useState(false); // Estado para la ventana de recuperación
  const [recoverEmail, setRecoverEmail] = useState(""); // Estado para el correo de recuperación
  const navigate = useNavigate();

  // Efecto para bloquear la cuenta si hay 5 intentos fallidos
  useEffect(() => {
    if (attempts >= 5) {
      setIsBlocked(true);
      setTimeout(() => {
        setIsBlocked(false);
        setAttempts(0);
      }, 30000);
    }
  }, [attempts]);

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (isBlocked) {
      setModalMessage('Cuenta bloqueada por demasiados intentos fallidos. Intente más tarde.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        onLogin(); // Actualiza el estado de inicio de sesión
        navigate('/home'); // Redirige a la página interna '/home'
      } else {
        setAttempts(prev => prev + 1);
        setModalMessage(result.message || 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      setModalMessage('Error al intentar iniciar sesión. Inténtalo de nuevo.');
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  const handleRecoverPassword = async () => {
    // Aquí puedes agregar la lógica para enviar el correo para recuperar la contraseña
    console.log("Correo de recuperación enviado a:", recoverEmail);
    setModalMessage('Se ha enviado un correo de recuperación si el correo existe en nuestros registros.');
    setRecoverEmail("");
    setShowRecoverPassword(false); // Cierra la ventana emergente después de enviar
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Iniciar Sesión</h2>

        {isBlocked && <p style={{ color: 'red' }}>Cuenta bloqueada. Intente de nuevo en 30 segundos.</p>}

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            onChange={() => clearErrors('email')}
            disabled={isBlocked}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            onChange={() => clearErrors('password')}
            disabled={isBlocked}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isBlocked}>Iniciar Sesión</button>

        <div className="form-group">
          <Link to="#" onClick={() => setShowRecoverPassword(true)}>Recuperar contraseña</Link>
        </div>
      </form>

      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {showRecoverPassword && (
        <div className="modal-overlay">
          <div className="modal-content recover-password-modal">
            <h2>Recuperar Contraseña</h2>
            <div className="form-group">
              <label htmlFor="recoverEmail">Correo Electrónico:</label>
              <input
                type="email"
                id="recoverEmail"
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
              />
            </div>
            <button onClick={handleRecoverPassword}>Enviar Correo</button>
            <button onClick={() => setShowRecoverPassword(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;