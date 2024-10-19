import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegisterForm.css';

// Esquema de validación con Yup
const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, 'Nombre inválido'),
  apellidoPaterno: yup.string().required('El apellido paterno es obligatorio').matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, 'Apellido inválido'),
  apellidoMaterno: yup.string().required('El apellido materno es obligatorio').matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/, 'Apellido inválido'),
  email: yup.string().email('Correo electrónico no válido').required('El correo es obligatorio'),
  telefono: yup.string().matches(/^[0-9]{10}$/, 'El número de teléfono debe tener 10 dígitos').required('El teléfono es obligatorio'),
});

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

function RegisterForm() {
  const { register, handleSubmit, formState: { errors },clearErrors } = useForm({
    resolver: yupResolver(schema),
  });

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    length: 0,  
  });

  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showStrengthBar, setShowStrengthBar] = useState(false); 
  const [modalMessage, setModalMessage] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (errors[name]) {
      clearErrors(name);
    }

    if (name === 'password') {
      setFormData({ ...formData, [name]: value });

      setPasswordRequirements({
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        length: value.length,
      });
    } else if (name === 'confirmPassword') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const calculatePasswordStrength = () => {
    const { hasUppercase, hasLowercase, hasNumber, hasSpecialChar, length } = passwordRequirements;
    let strength = 0;

    // Aumentar la fuerza por cumplir con los requisitos
    if (hasUppercase) strength++;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;

    // Aumentar la fuerza según la longitud de la contraseña
    if (length >= 8 && length < 12) {
      strength++;  // Contraseña suficientemente larga
    } else if (length >= 12) {
      strength += 2;  // Contraseña muy larga, más segura
    }

    return strength;
  };

  const getStrengthColor = () => {
    const strength = calculatePasswordStrength();
    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'red'; // Insegura
      case 3:
      case 4:
        return 'orange'; // Poco segura
      case 5:
      case 6:
        return 'green'; // Segura
      case 7:
        return 'green'; // Muy segura
      default:
        return 'red';
    }
  };

  const getStrengthLabel = () => {
    const strength = calculatePasswordStrength();
    switch (strength) {
      case 0:
      case 1:
      case 2:
        return 'Insegura';
      case 3:
      case 4:
        return 'Poco segura';
      case 5:
      case 6:
        return 'Segura';
      case 7:
        return 'Muy segura';
      default:
        return 'Insegura';
    }
  };

  const onSubmit = async (data) => {
    const { password, confirmPassword } = formData;

    if (password.length < 8) {
      setModalMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Enviar los datos al backend (localhost:5000/api/users/register)
      const response = await axios.post('http://localhost:5000/api/users/register', {
        ...data, // Enviar los datos del formulario
        password // Incluir la contraseña
      });
      setModalMessage('¡Registro exitoso!'); // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setModalMessage("Hubo un error al registrar. Por favor intenta de nuevo.");
    }
  };

  const closeModal = () => {
    setModalMessage(null); 
  };

  const { hasUppercase, hasLowercase, hasNumber, hasSpecialChar, length } = passwordRequirements;
  const passwordStrength = calculatePasswordStrength();
  const passwordStrengthColor = getStrengthColor();
  const passwordStrengthLabel = getStrengthLabel();

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Regístrate</h2>

        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" {...register('nombre')} onChange={handleChange} />
          {errors.nombre && <p style={{ color: 'red' }}>{errors.nombre.message}</p>}
        </div>

        {/* Apellido Paterno */}
        <div className="form-group">
          <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
          <input type="text" id="apellidoPaterno" {...register('apellidoPaterno')} onChange={handleChange} />
          {errors.apellidoPaterno && <p style={{ color: 'red' }}>{errors.apellidoPaterno.message}</p>}
        </div>

        {/* Apellido Materno */}
        <div className="form-group">
          <label htmlFor="apellidoMaterno">Apellido Materno:</label>
          <input type="text" id="apellidoMaterno" {...register('apellidoMaterno')} onChange={handleChange} />
          {errors.apellidoMaterno && <p style={{ color: 'red' }}>{errors.apellidoMaterno.message}</p>}
        </div>

        {/* Correo Electrónico */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" {...register('email')} onChange={handleChange} />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input type="tel" id="telefono" {...register('telefono')} onChange={handleChange} />
          {errors.telefono && <p style={{ color: 'red' }}>{errors.telefono.message}</p>}
        </div>

        {/* Contraseña */}
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            onFocus={() => { setShowPasswordRequirements(true); setShowStrengthBar(true); }}  // Mostrar barra y leyendas al hacer foco
            onBlur={() => { setShowPasswordRequirements(false); }}   // Ocultar leyenda al salir del foco
          />
          
          {/* Barra de seguridad de contraseña */}
          {showStrengthBar && (
            <>
              <div style={{
                height: '8px',
                backgroundColor: passwordStrengthColor,
                width: `${(passwordStrength / 7) * 100}%`,  // Ajustar la longitud de la barra
                marginTop: '5px'
              }} />

              {/* Leyenda de la fuerza de la contraseña */}
              <p style={{ color: passwordStrengthColor, fontWeight: 'bold' }}>
                {passwordStrengthLabel}
              </p>
            </>
          )}

          {/* Leyenda para los requisitos de la contraseña */}
          {showPasswordRequirements && (
            <div style={{ color: hasUppercase && hasLowercase && hasNumber && hasSpecialChar ? 'green' : 'red' }}>
              <p>La contraseña debe contener:</p>
              <ul>
                <li style={{ color: hasUppercase ? 'green' : 'red' }}>Al menos una letra mayúscula</li>
                <li style={{ color: hasLowercase ? 'green' : 'red' }}>Al menos una letra minúscula</li>
                <li style={{ color: hasNumber ? 'green' : 'red' }}>Al menos un número</li>
                <li style={{ color: hasSpecialChar ? 'green' : 'red' }}>Al menos un símbolo especial (!@#$%^&*)</li>
                <li style={{ color: length >= 8 ? 'green' : 'red' }}>Al menos 8 caracteres</li>
              </ul>
            </div>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit">Registrarse</button>
      </form>
      {modalMessage && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
}

export default RegisterForm;
