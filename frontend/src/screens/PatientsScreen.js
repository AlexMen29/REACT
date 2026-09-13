import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { UserContext } from './context/UserContext';

const PatitensScreen = () => {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { user } = useContext(UserContext);

    const addPatient = () => {
        if (!name.trim()) {
            Alert.alert('Aviso', 'Ingresa el nombre del paciente');
            return;
        }

        if (editingId) {
            setPatients(patients.map(p => p.id === editingId ? { ...p, name: name.trim() } : p));
            setEditingId(null);
        } else {
            const newPatient = {
                id: Date.now().toString(),
                name: name.trim(),
            };
            setPatients([...patients, newPatient]);
        }
        setName('');
    };

    const editPatient = (item) => {
        setEditingId(item.id);
        setName(item.name);
    };

    const deletePatient = (id) => {
        setPatients(patients.filter(p => p.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setName('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestión de Pacientes - {user?.username}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del Paciente"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity style={styles.addButton} onPress={addPatient}>
                <Text style={styles.addButtonText}>
                    {editingId ? "Actualizar Paciente" : "Agregar Paciente"}
                </Text>
            </TouchableOpacity>

            <Text style={styles.counter}>Pacientes registrados: {patients.length}</Text>

            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ alignItems: 'center', width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editPatient(item)}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePatient(item.id)}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#006699',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
    },
    addButton: {
        width: '100%',
        height: 48,
        backgroundColor: '#006699',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    counter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        alignSelf: 'center',
    },
    itemContainer: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 16,
        color: '#212529',
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    editButton: {
        backgroundColor: '#006699',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: 'bold',
    },
});

export default PatitensScreen;
