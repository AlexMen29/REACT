const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//servidor http
const app = express();

//configuraciones servidor http
app.use(bodyParser.json());
app.use(cors());

//conexion a la base de datos
mongoose.connect('mongodb+srv://alexmenivar2018_db_user:admin@cluster0.p4eyed1.mongodb.net/clinica_pediatrica')
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.error("Error al conectar a MongoDB: ", err));

//Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


//rutas de la api
//rutas para pacientes
const pacienteRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacienteRoutes);

//rutas para medicos
const medicoRoutes = require('./routes/medico');
app.use('/api/medicos', medicoRoutes);



//configurar puerto para back
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});