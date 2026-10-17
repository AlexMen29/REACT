const Medico = require('../models/medico');

// Obtener todos los médicos
exports.getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find();
        res.json(medicos);
    } catch (error) {
        console.error('Error al obtener médicos:', error);
        res.status(500).json({ message: 'Error al obtener los médicos', error: error.message });
    }
};

// Crear un nuevo médico
exports.addMedico = async (req, res) => {
    try {
        const data = Array.isArray(req.body) ? req.body[0] : req.body;
        const { nombre, especialidad, telefono } = data || {};

        if (!nombre || !especialidad || !telefono) {
            return res.status(400).json({ message: 'Todos los campos son requeridos (nombre, especialidad, telefono)' });
        }

        const nuevoMedico = new Medico({ nombre, especialidad, telefono });
        await nuevoMedico.save();
        res.status(201).json(nuevoMedico);
    } catch (error) {
        console.error('Error al crear médico:', error);
        res.status(400).json({ message: 'Error al crear el médico', error: error.message });
    }
};

// Actualizar un médico por ID
exports.updateMedico = async (req, res) => {
    const { id } = req.params;
    const data = Array.isArray(req.body) ? req.body[0] : req.body;
    const { nombre, especialidad, telefono } = data || {};

    try {
        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,
            { nombre, especialidad, telefono },
            { new: true }
        );

        if (!medicoActualizado) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }

        res.json(medicoActualizado);
    } catch (error) {
        console.error('Error al actualizar médico:', error);
        res.status(400).json({ message: 'Error al actualizar el médico', error: error.message });
    }
};

// Eliminar un médico por ID
exports.deleteMedico = async (req, res) => {
    const { id } = req.params;
    try {
        const medicoEliminado = await Medico.findByIdAndDelete(id);
        if (!medicoEliminado) {
            return res.status(404).json({ message: 'Médico no encontrado' });
        }
        res.json({ message: 'Médico eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar médico:', error);
        res.status(400).json({ message: 'Error al eliminar el médico', error: error.message });
    }
};
