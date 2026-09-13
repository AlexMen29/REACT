//importaciones
import React from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';


//nuestro componente principal
const ConfigureScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configuracion</Text>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="person" size={20} color="#fff" />
                <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="notifications" size={20} color="#fff" />
                <Text style={styles.buttonText}>Notificaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="color-palette" size={20} color="#fff" />
                <Text style={styles.buttonText}>Preferencias de Tema</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="globe" size={20} color="#fff" />
                <Text style={styles.buttonText}>Idioma</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="lock-closed" size={20} color="#fff" />
                <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="information-circle" size={20} color="#fff" />
                <Text style={styles.buttonText}>Acerca de la Aplicacion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Ionicons name="log-out" size={20} color="#fff" />
                <Text style={styles.buttonText}>Cerrar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDanger} onPress={() => { }}>
                <Ionicons name="trash" size={20} color="#fff" />
                <Text style={styles.buttonText}>Eliminar Cuenta</Text>
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
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#005187',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
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
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
    }
});

//exportamos nuestro componente
export default ConfigureScreen;