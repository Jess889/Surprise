import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css'; // Mantén tu CSS
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente de ReCAPTCHA

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup.string().email('Correo electrónico no válido').required('El correo es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema),
  });
  
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para el token de reCAPTCHA
  const [modalMessage, setModalMessage] = useState(null);
  const [showRecoverPassword, setShowRecoverPassword] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir a otra página

  // Manejar cambio de reCAPTCHA
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Almacenar el token de reCAPTCHA
  };

  const onSubmit = async (data) => {
    const { email, password } = data;

    if (!captchaToken) {
      setModalMessage('Por favor, completa el reCAPTCHA.');
      return;
    }

    try {
      // Llamada a la API para verificar las credenciales junto con el token de reCAPTCHA
      const response = await fetch('https://recaptchaenterprise.googleapis.com/v1/projects/surprise-1728966738438/assessments?key=API_KEY', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, captchaToken }),
      });

      const result = await response.json();

      if (response.ok) {
        // Si las credenciales son correctas, redirigir al usuario
        navigate('/home'); // Redirige a la página interna '/home'
      } else {
        // Mostrar el mensaje de error si las credenciales no coinciden
        setModalMessage(result.message || 'Correo o contraseña incorrectos.');
      }
    } catch (error) {
      setModalMessage('Error al intentar iniciar sesión. Inténtalo de nuevo.');
    }
  };

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Iniciar Sesión</h2>

        {/* Correo Electrónico */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" {...register('email')} onChange={() => clearErrors('email')} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        {/* Contraseña */}
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            {...register('password')}
            onChange={() => clearErrors('password')}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        {/* Componente de reCAPTCHA */}
        <div className="form-group">
          <ReCAPTCHA
            sitekey="6Lc_sWMqAAAAAEKiLlsJYQhk48QL-NhCjmkuqp63" // Usa tu sitekey
            onChange={handleCaptchaChange} // Ejecutar función cuando el reCAPTCHA es completado
          />
        </div>

        <button type="submit">Iniciar Sesión</button>

        {/* Botón para recuperar la contraseña */}
        <div className="form-group">
          <Link to="#" onClick={() => setShowRecoverPassword(true)}>Recuperar contraseña</Link>
        </div>
      </form>

      {/* Mostrar el modal si hay un mensaje */}
      {modalMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;