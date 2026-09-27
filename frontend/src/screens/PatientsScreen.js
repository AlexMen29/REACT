import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { UserContext } from './context/UserContext';
import { ThemeContext } from './context/ThemeContext';

const PatientsScreen = () => {
    const db = useSQLiteContext(); 
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [editingId, setEditingId] = useState(null);
    const { user } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);

    // Cargar pacientes desde SQLite al iniciar
    useEffect(() => {
        loadpatients();
    }, []);

    const loadpatients = async () => {
        try {
            const result = await db.getAllAsync('SELECT * FROM patients ORDER BY id DESC');
            setPatients(result);
        } catch (error) {
            console.log('Error cargando pacientes:', error);
        }
    };

    const addPatient = async () => {
        if (!name.trim()) {
            Alert.alert('Aviso', 'Por favor ingresa al menos el nombre del paciente');
            return;
        }

        try {
            if (editingId) {
                // Actualizar paciente en SQLite con los campos ampliados
                await db.runAsync(
                    'UPDATE patients SET name = ?, phone = ?, birthDate = ?, address = ? WHERE id = ?',
                    [name.trim(), phone.trim(), birthDate.trim(), address.trim(), editingId]
                );
                setEditingId(null);
                Alert.alert('Éxito', 'Paciente actualizado correctamente');
            } else {
                // Insertar paciente en SQLite con los campos ampliados
                await db.runAsync(
                    'INSERT INTO patients (name, phone, birthDate, address) VALUES (?, ?, ?, ?)',
                    [name.trim(), phone.trim(), birthDate.trim(), address.trim()]
                );
                Alert.alert('Éxito', 'Paciente registrado correctamente');
            }
            setName('');
            setPhone('');
            setBirthDate('');
            setAddress('');
            await loadpatients();
        } catch (error) {
            console.log('Error al guardar paciente:', error);
            Alert.alert('Error', 'No se pudo guardar el paciente');
        }
    };

    const editPatient = (item) => {
        setEditingId(item.id);
        setName(item.name || '');
        setPhone(item.phone || '');
        setBirthDate(item.birthDate || '');
        setAddress(item.address || '');
    };

    const cancelEdit = () => {
        setEditingId(null);
        setName('');
        setPhone('');
        setBirthDate('');
        setAddress('');
    };

    const deletePatient = (id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar a este paciente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Eliminar paciente en SQLite
                            await db.runAsync('DELETE FROM patients WHERE id = ?', [id]);
                            if (editingId === id) {
                                cancelEdit();
                            }
                            await loadpatients();
                            Alert.alert('Eliminado', 'El paciente ha sido eliminado');
                        } catch (error) {
                            console.log('Error al eliminar paciente:', error);
                            Alert.alert('Error', 'No se pudo eliminar el paciente');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <Text style={[styles.title, darkMode && styles.titleDark]}>
                Gestión de Pacientes - {user?.username}
            </Text>

            {/* Formulario con campos ampliados */}
            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Nombre del Paciente *"
                placeholderTextColor={darkMode ? '#777' : '#999'}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Teléfono (ej: 7123-4567)"
                placeholderTextColor={darkMode ? '#777' : '#999'}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />

            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Fecha de Nacimiento (ej: 15/05/2020)"
                placeholderTextColor={darkMode ? '#777' : '#999'}
                value={birthDate}
                onChangeText={setBirthDate}
            />

            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Dirección"
                placeholderTextColor={darkMode ? '#777' : '#999'}
                value={address}
                onChangeText={setAddress}
            />

            <TouchableOpacity style={styles.addButton} onPress={addPatient}>
                <Text style={styles.addButtonText}>
                    {editingId ? "Actualizar Paciente" : "Agregar Paciente"}
                </Text>
            </TouchableOpacity>

            {editingId && (
                <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                    <Text style={styles.cancelButtonText}>Cancelar Edición</Text>
                </TouchableOpacity>
            )}

            <Text style={[styles.counter, darkMode && styles.textDark]}>
                Pacientes registrados: {patients.length}
            </Text>

            <FlatList
                data={patients}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ width: '100%', paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, darkMode && styles.itemContainerDark]}>
                        <View style={styles.infoContainer}>
                            <Text style={[styles.itemTitle, darkMode && styles.textDark]}>{item.name}</Text>
                            {item.phone ? (
                                <Text style={[styles.itemDetail, darkMode && styles.detailDark]}>
                                    📞 Tel: {item.phone}
                                </Text>
                            ) : null}
                            {item.birthDate ? (
                                <Text style={[styles.itemDetail, darkMode && styles.detailDark]}>
                                    🎂 Nacimiento: {item.birthDate}
                                </Text>
                            ) : null}
                            {item.address ? (
                                <Text style={[styles.itemDetail, darkMode && styles.detailDark]}>
                                    📍 Dirección: {item.address}
                                </Text>
                            ) : null}
                        </View>
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#006699',
        marginBottom: 15,
        textAlign: 'center',
    },
    titleDark: {
        color: '#4dabf7',
    },
    input: {
        width: '100%',
        height: 46,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 10,
        fontSize: 15,
        color: '#333',
        backgroundColor: '#ffffff',
    },
    inputDark: {
        backgroundColor: '#1e1e1e',
        borderColor: '#333333',
        color: '#f1f1f1',
    },
    addButton: {
        width: '100%',
        height: 46,
        backgroundColor: '#006699',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        width: '100%',
        height: 40,
        backgroundColor: '#6c757d',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    cancelButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    counter: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginVertical: 10,
        textAlign: 'center',
    },
    textDark: {
        color: '#f1f1f1',
    },
    detailDark: {
        color: '#adb5bd',
    },
    itemContainer: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#dee2e6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemContainerDark: {
        backgroundColor: '#1e1e1e',
        borderColor: '#2e2e2e',
    },
    infoContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 4,
    },
    itemDetail: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },
    buttonGroup: {
        flexDirection: 'column',
        gap: 6,
    },
    editButton: {
        backgroundColor: '#006699',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default PatientsScreen;
