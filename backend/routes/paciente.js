const express = require('express');    
const router = express.Router();    
const {getPacientes, addPaciente, updatePaciente, deletePaciente}= require('../controllers/pacienteController');



// Ruta para obtener todos los pacientes
router.get('/', getPacientes);
router.post('/', addPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);  


module.exports = router;