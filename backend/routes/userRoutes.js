//userRoutes con catpcha
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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
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

    // Si las credenciales son válidas, responde con éxito
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ message: 'Error autenticando al usuario' });
  }
});


module.exports = router;
