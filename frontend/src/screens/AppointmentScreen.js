import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { UserContext } from './context/UserContext';

const AppointmentScreen = () => {
    // Estado para abrir/cerrar la ventana flotante
    const [modalVisible, setModalVisible] = useState(false);

    const { user } = useContext(UserContext);

    const [appointments, setAppointments] = useState([
        { id: '1', date: '2024-08-01', time: '10:00 AM', patient: 'Juan Pérez', motive: 'Revisión general' },
        { id: '2', date: '2024-08-03', time: '11:00 AM', patient: 'Ana García', motive: 'Consulta de seguimiento' },
    ]);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [patient, setPatient] = useState('');
    const [motive, setMotive] = useState('');

    const handleAddAppointment = () => {
        if (!date.trim() || !time.trim() || !patient.trim() || !motive.trim()) {
            Alert.alert('Aviso', 'Completa todos los datos de la cita');
            return;
        }

        const newAppointment = {
            id: Date.now().toString(),
            date: date.trim(),
            time: time.trim(),
            patient: patient.trim(),
            motive: motive.trim(),
        };

        setAppointments([...appointments, newAppointment]);
        setDate('');
        setTime('');
        setPatient('');
        setMotive('');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Citas Programadas - {user?.username}</Text>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.infoText}><Text style={styles.label}>Fecha: </Text>{item.date}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Hora: </Text>{item.time}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Paciente: </Text>{item.patient}</Text>
                        <Text style={styles.infoText}><Text style={styles.label}>Motivo: </Text>{item.motive}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Nueva Cita</Text>
            </TouchableOpacity>

            {/* Modal flotante para crear cita */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Agendar Nueva Cita</Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Fecha (ej: 2026-09-10)"
                            value={date}
                            onChangeText={setDate}
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Hora (ej: 09:30 AM)"
                            value={time}
                            onChangeText={setTime}
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Nombre del Paciente"
                            value={patient}
                            onChangeText={setPatient}
                        />

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Motivo de consulta"
                            value={motive}
                            onChangeText={setMotive}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.cancelBtn]} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelBtnText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.modalBtn, styles.saveBtn]} 
                                onPress={handleAddAppointment}
                            >
                                <Text style={styles.saveBtnText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    infoText: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 6,
    },
    label: {
        fontWeight: 'bold',
        color: '#212529',
    },
    button: {
        backgroundColor: '#5e17eb',
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        shadowColor: '#5e17eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 18,
        textAlign: 'center',
    },
    modalInput: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        fontSize: 15,
        color: '#333',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    modalBtn: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelBtn: {
        backgroundColor: '#f1f3f5',
        marginRight: 10,
    },
    cancelBtnText: {
        color: '#495057',
        fontWeight: 'bold',
    },
    saveBtn: {
        backgroundColor: '#5e17eb',
        marginLeft: 10,
    },
    saveBtnText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default AppointmentScreen;
