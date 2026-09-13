import {useState} from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const PatitensScreen = () => {
    const [inputText, setInputText] = useState('');
    const [patients, setPatients] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // agregar paciente
    const addPatient = () => {
        if (inputText.trim()) {
            const newPatient = {
                id: Date.now().toString(),
                name: inputText,
            };
            setPatients([...patients, newPatient]);
            setInputText('');
        }
    };

    // editar paciente
    const editPatient = (id) => {
        const patientToEdit = patients.find((p) => p.id === id);
        if (patientToEdit) {
            setInputText(patientToEdit.name);
            deletePatient(id);
        }
    };

    // eliminar paciente
    const deletePatient = (id) => {
        setPatients(patients.filter((patient) => patient.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gestion de Pacientes</Text>
            <TextInput
                style={[styles.input, {
                    borderWidth: isFocused ? 3 : 1
                }]}
                placeholder="Ingrese el nombre del paciente"
                value={inputText}
                onChangeText={setInputText}
                OnFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity style={styles.addButton} onPress={addPatient}>
                <Text style={styles.addButtonText}>Agregar Paciente</Text>
            </TouchableOpacity>

            <Text style={styles.counter}>Pacientes Registrados: {patients.length}</Text>


            <FlatList
                data={patients}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ alignItems: 'center', width: '100%' }}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={styles.ButtonGroup}>
                            <TouchableOpacity style={styles.editButton} onPress={() => editPatient(item.id)}>
                                <Text style={styles.ButtonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePatient(item.id)}>
                                <Text style={styles.ButtonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,//Activar flexbox para que el contenedor ocupe todo el espacio disponible
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#c8dcf6',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#005187',
    },
    input: {
        height: 50,
        borderColor: '#005187',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        width: '100%',
        backgroundColor: '#fff',
        fontSize: 18,
    },
    addButton: {
        width: '100%',
        backgroundColor: '#005187',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    counter: {
        margin: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemContainer: {
        padding: 10,
        margin : 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        margin: 10,
        flexWrap: 'wrap',
        fontWeight: 'bold',
    },
    ButtonGroup: {
        flexDirection: 'row',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#ffc107',
        padding: 10,
        width: '40%',
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        width: '40%',
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PatitensScreen;