//importaciones
import React, { useContext, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './context/UserContext';
import { ThemeContext } from './context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        const loadUser = async () => { 
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser && setUser) {
                setUser({ username: storedUser });
            }   
        };

        loadUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        if (setUser) setUser(null);
        navigation.replace('Login');
    };

    return (
        <View style={[styles.container, darkMode && styles.containerDark]}>
            <Text style={[styles.title, darkMode && styles.textDark]}>
                Bienvenido, {user?.username} a la Clinica Pediatrica
            </Text>
            <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark]} onPress={() => navigation.navigate('Perfil')}>
                <MaterialCommunityIcons name="account" size={24} color="white" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark]} onPress={() => navigation.navigate('Pacientes')}>
                <MaterialCommunityIcons name="baby-carriage" size={24} color="white" />
                <Text style={styles.buttonText}>Gestion de Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark]} onPress={() => navigation.navigate('Configuracion')}>
                <MaterialCommunityIcons name="cog" size={24} color="white" />
                <Text style={styles.buttonText}>Configuracion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark]} onPress={() => navigation.navigate('Citas')}>
                <MaterialCommunityIcons name="calendar" size={24} color="white" />
                <Text style={styles.buttonText}>Citas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, darkMode && styles.buttonDark]} onPress={() => navigation.navigate('Historial')}>
                <MaterialCommunityIcons name="file-document" size={24} color="white" />
                <Text style={styles.buttonText}>Historial Medico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDanger} onPress={handleLogout}>
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
    containerDark: {
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    textDark: {
        color: '#ffffff',
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
    buttonDark: {
        backgroundColor: '#1b3a57',
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

export default HomeScreen;