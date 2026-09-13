import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from './context/UserContext';

const SettingsScreen = ({ navigation }) => {
    const [citasReminder, setCitasReminder] = useState(true);
    const [vacunacionAlert, setVacunacionAlert] = useState(true);
    const [modoOscuro, setModoOscuro] = useState(false);
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        if (logout) logout();
        navigation.navigate('Login');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Configuración</Text>

            <Text style={styles.sectionTitle}>NOTIFICACIONES</Text>
            <View style={styles.card}>
                <View style={styles.settingRow}>
                    <Text style={styles.settingText}>Recordatorios de Citas</Text>
                    <Switch 
                        value={citasReminder} 
                        onValueChange={setCitasReminder}
                        trackColor={{ false: '#767577', true: '#006699' }}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.settingRow}>
                    <Text style={styles.settingText}>Alertas de Vacunación</Text>
                    <Switch 
                        value={vacunacionAlert} 
                        onValueChange={setVacunacionAlert}
                        trackColor={{ false: '#767577', true: '#006699' }}
                    />
                </View>
            </View>

            <Text style={styles.sectionTitle}>GENERAL</Text>
            <View style={styles.card}>
                <View style={styles.settingRow}>
                    <Text style={styles.settingText}>Modo Oscuro</Text>
                    <Switch 
                        value={modoOscuro} 
                        onValueChange={setModoOscuro}
                        trackColor={{ false: '#767577', true: '#006699' }}
                    />
                </View>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={styles.settingText}>Idioma</Text>
                    <Text style={styles.settingValue}>Español {'>'}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>SEGURIDAD</Text>
            <View style={styles.card}>
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={styles.settingText}>Cambiar Contraseña</Text>
                    <Text style={styles.settingValue}>{'>'}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={styles.settingText}>Términos y Privacidad</Text>
                    <Text style={styles.settingValue}>{'>'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#212529',
        marginTop: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#006699',
        marginTop: 15,
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        marginBottom: 10,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    settingText: {
        fontSize: 15,
        color: '#212529',
    },
    settingValue: {
        fontSize: 14,
        color: '#6c757d',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f3f5',
    },
    logoutCard: {
        backgroundColor: '#fee2e2',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 40,
    },
    logoutText: {
        color: '#dc2626',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
