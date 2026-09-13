//Importaciones
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from './context/UserContext';

const ProfileScreen = () => {
    const { user } = useContext(UserContext);
    const nombre = user?.username ? (user.username.toLowerCase() === 'alex' ? 'Omar Alexander Najarro Menjivar' : user.username) : 'Omar Alexander Najarro Menjivar';

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/catLogo.png')} style={styles.logo} />
            <Text style={styles.title}>Perfil de Usuario</Text>
            <View style={styles.infoContainer}>
                <Ionicons name="person" size={20} color="#7056ce" />
                <Text style={styles.infoText}>Nombre: {nombre}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Ionicons name="briefcase" size={20} color="#7056ce" />
                <Text style={styles.infoText}>Rol: Pediatra</Text>
            </View>
            <View style={styles.infoContainer}>
                <Ionicons name="mail" size={20} color="#7056ce" />
                <Text style={styles.infoText}>Correo: alex.najarro@gmail.com</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6284b3',
        padding: 20,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 40,
        fontWeight: 'bold',
        TextAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 48,
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 10,
        alignSelf: 'center',
    },
    infoText: {
        fontSize: 12,
        marginLeft: 10,
    }
});

export default ProfileScreen;