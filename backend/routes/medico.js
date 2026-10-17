const express = require('express');
const router = express.Router();
const { 
    getMedicos, 
    addMedico, 
    updateMedico, 
    deleteMedico 
} = require('../controllers/medicoController');

// Rutas CRUD para Médicos
router.get('/', getMedicos);
router.post('/', addMedico);
router.put('/:id', updateMedico);
router.delete('/:id', deleteMedico);

module.exports = router;
