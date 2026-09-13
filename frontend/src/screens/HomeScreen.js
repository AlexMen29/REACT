//importaciones
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useContext } from 'react';
import { UserContext } from './context/UserContext'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const {user} = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {user?.username} a la Clinica Pediatrica</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
                <MaterialCommunityIcons name="account" size={24} color="white" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pacientes')}>
                <MaterialCommunityIcons name="baby-carriage" size={24} color="white" />
                <Text style={styles.buttonText}>Gestion de Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configuracion')}>
                <MaterialCommunityIcons name="cog" size={24} color="white" />
                <Text style={styles.buttonText}>Configuracion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Citas')}>
                <MaterialCommunityIcons name="calendar" size={24} color="white" />
                <Text style={styles.buttonText}>Citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Historial')}>
                <MaterialCommunityIcons name="file-document" size={24} color="white" />
                <Text style={styles.buttonText}>Historial Medico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDanger} onPress={() => navigation.navigate('Login')}>
                <MaterialCommunityIcons name="logout" size={24} color="white" />
                <Text style={styles.buttonText}>Cerrar Sesion</Text>
            </TouchableOpacity>
        </View>
    );
};

//constantes de estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    spacer: {
        height: 20,
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#005187',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        margin: 15,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    buttonDanger: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#bd1a1a',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        margin: 15,
        alignSelf: 'center',
    }
});

//exportamos nuestro componente
export default HomeScreen;