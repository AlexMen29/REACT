import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './context/UserContext';
import { ThemeContext } from './context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
    const [citasReminder, setCitasReminder] = useState(true);
    const [vacunacionAlert, setVacunacionAlert] = useState(true);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const { logout } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log('Error al cerrar sesión:', error);
        }
        if (logout) logout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <ScrollView style={[styles.container, darkMode && styles.containerDark]}>
            <Text style={[styles.title, darkMode && styles.textDark]}>Configuración</Text>

            <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>NOTIFICACIONES</Text>
            <View style={[styles.card, darkMode && styles.cardDark]}>
                <View style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Recordatorios de Citas</Text>
                    <Switch 
                        value={citasReminder} 
                        onValueChange={setCitasReminder}
                        trackColor={{ false: '#767577', true: '#006699' }}
                    />
                </View>
                <View style={[styles.divider, darkMode && styles.dividerDark]} />
                <View style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Alertas de Vacunación</Text>
                    <Switch 
                        value={vacunacionAlert} 
                        onValueChange={setVacunacionAlert}
                        trackColor={{ false: '#767577', true: '#006699' }}
                    />
                </View>
            </View>

            <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>GENERAL</Text>
            <View style={[styles.card, darkMode && styles.cardDark]}>
                <View style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Modo Oscuro</Text>
                    <Switch 
                        value={darkMode} 
                        onValueChange={toggleDarkMode}
                        trackColor={{ false: '#767577', true: '#006699' }}
                        thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
                    />
                </View>
                <View style={[styles.divider, darkMode && styles.dividerDark]} />
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Idioma</Text>
                    <Text style={[styles.settingValue, darkMode && styles.settingValueDark]}>Español</Text>
                </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, darkMode && styles.sectionTitleDark]}>SEGURIDAD</Text>
            <View style={[styles.card, darkMode && styles.cardDark]}>
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Cambiar Contraseña</Text>
                    <Text style={[styles.settingValue, darkMode && styles.settingValueDark]}>{'>'}</Text>
                </TouchableOpacity>
                <View style={[styles.divider, darkMode && styles.dividerDark]} />
                <TouchableOpacity style={styles.settingRow}>
                    <Text style={[styles.settingText, darkMode && styles.textDark]}>Términos y Privacidad</Text>
                    <Text style={[styles.settingValue, darkMode && styles.settingValueDark]}>{'>'}</Text>
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
    containerDark: {
        backgroundColor: '#121212',
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
    sectionTitleDark: {
        color: '#4dabf7',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        marginBottom: 10,
    },
    cardDark: {
        backgroundColor: '#1e1e1e',
        borderColor: '#2e2e2e',
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
    textDark: {
        color: '#f1f1f1',
    },
    settingValue: {
        fontSize: 14,
        color: '#6c757d',
    },
    settingValueDark: {
        color: '#adb5bd',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f3f5',
    },
    dividerDark: {
        backgroundColor: '#2e2e2e',
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
