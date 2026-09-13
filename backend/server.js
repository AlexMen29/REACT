const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();
//configuraciones al servidor http
app.use(bodyParser.json());
app.use(cors());

//conexión a la base de datos
mongoose.connect('mongodb://localhost/sistema-clinica')

//Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//configuración del puerto para backend
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});