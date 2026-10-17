const Paciente = require('../models/paciente');

//controlador para crear un nuevo paciente
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).json({ message: 'Error al obtener los pacientes' });
    }  
};



//controlador para crear un nuevo paciente
exports.addPaciente = async (req, res) => {
    // Si enviaron un arreglo [{ ... }], tomamos el primer elemento
    const data = Array.isArray(req.body) ? req.body[0] : req.body;
    const { nombre, edad, enfermedad } = data || {};
    try {
        const nuevoPaciente = new Paciente({ nombre, edad, enfermedad });
        await nuevoPaciente.save();
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        res.status(400).json({ message: 'Error al crear el paciente', error: error.message });
    }
};  

//funcion para actualizar un paciente
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, edad, enfermedad } = req.body;
    try {
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            id, 
            { nombre, edad, enfermedad }, 
            { new: true }
        );
        res.json(pacienteActualizado);
    } catch (error) {
        console.error('Error al actualizar el paciente:', error);
        res.status(400).json({ message: 'Error al actualizar el paciente', error: error.message });
    }
};  

//funcion para eliminar un paciente
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        res.status(400).json({ message: 'Error al eliminar el paciente' });
    }   
};  