const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { nombreUsuario } = req.body;
        const password = req.body.contraseña || req.body.contrasena || req.body.password;

        if (!nombreUsuario || !password) {
            return res.status(400).json({ mensaje: 'Credenciales incompletas' });
        }

        const usuario = await Usuario.findOne({ nombreUsuario });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const esCoincidente = await bcrypt.compare(password, usuario.contraseña);
        if (!esCoincidente) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            'claveSecreta',
            { expiresIn: '1h' }
        );

        res.json({ token, mensaje: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en el servidor (backend)',
            error: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const { nombreUsuario, rol } = req.body;
        const password = req.body.contraseña || req.body.contrasena || req.body.password;

        if (!nombreUsuario || !password) {
            return res.status(400).json({ mensaje: 'Nombre de usuario y contraseña son requeridos' });
        }

        const usuarioExistente = await Usuario.findOne({ nombreUsuario });

        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        const nuevoUsuario = new Usuario({ 
            nombreUsuario, 
            contraseña: password, 
            rol: rol || 'user' 
        });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: 'Error en el servidor (backend)',
            error: error.message
        });
    }
};

module.exports = { login, register };

