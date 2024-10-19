const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const axios = require('axios');  // Importa axios para manejar el reCAPTCHA

const router = express.Router();

// Ruta para registrar un nuevo usuario (esto ya lo tienes)
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellidoPaterno, apellidoMaterno, email, telefono, password } = req.body;

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      nombre, 
      apellidoPaterno, 
      apellidoMaterno, 
      email, 
      telefono, 
      password: hashedPassword 
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registrando al usuario' });
  }
});

// Ruta para iniciar sesión con validación de reCAPTCHA
router.post('/login', async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  // Verificar si el token de reCAPTCHA está presente
  if (!recaptchaToken) {
    return res.status(400).json({ message: 'reCAPTCHA no completado' });
  }

  try {
    // Verificar el token de reCAPTCHA con Google
    const recaptchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', {}, {
      params: {
        secret: 'https://www.google.com/recaptcha/enterprise.js?render=6Lc_sWMqAAAAAJ4F0MzpZ_5qPL9yl-MJ2OKrH8Ve',  // Reemplaza con tu clave secreta de reCAPTCHA
        response: recaptchaToken,
      },
    });

    const { success } = recaptchaResponse.data;

    if (!success) {
      return res.status(400).json({ message: 'reCAPTCHA no válido' });
    }

    // Validar las credenciales del usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Si el login y el reCAPTCHA son válidos, responde con éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ message: 'Error verificando reCAPTCHA o autenticando al usuario' });
  }
});

module.exports = router;
