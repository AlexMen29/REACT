import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserContext } from './context/UserContext';

const MedicalHistoryScreen = () => {
    const { user } = useContext(UserContext);

    const historyData = [
        {
            id: '1',
            date: '2024-07-15',
            doctor: 'Dra. María Hernández - Pediatra',
            diagnosis: 'Control pediátrico de rutina y crecimiento',
            treatment: 'Multivitamínico pediátrico 5ml cada 24h por 30 días.',
            notes: 'Desarrollo estatural y ponderal adecuado para la edad.',
        },
        {
            id: '2',
            date: '2024-05-20',
            doctor: 'Dr. Roberto Castillo - Infectólogo Pediatra',
            diagnosis: 'Rinofaringitis aguda catarral',
            treatment: 'Lavados nasales con solución salina, acetaminofén según fiebre.',
            notes: 'Evolución favorable, sin signos de dificultad respiratoria.',
        },
        {
            id: '3',
            date: '2024-02-10',
            doctor: 'Dra. María Hernández - Pediatra',
            diagnosis: 'Esquema de vacunación anual',
            treatment: 'Refuerzo de vacuna triple viral e influenza.',
            notes: 'Tolerancia adecuada sin reacciones adversas.',
        },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial Médico - {user?.username}</Text>

            <FlatList
                data={historyData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.headerRow}>
                            <Text style={styles.dateText}>📅 {item.date}</Text>
                        </View>
                        <Text style={styles.doctorText}>👨‍⚕️ {item.doctor}</Text>
                        <View style={styles.divider} />
                        
                        <Text style={styles.fieldTitle}>Diagnóstico:</Text>
                        <Text style={styles.fieldContent}>{item.diagnosis}</Text>

                        <Text style={styles.fieldTitle}>Tratamiento:</Text>
                        <Text style={styles.fieldContent}>{item.treatment}</Text>

                        <Text style={styles.fieldTitle}>Observaciones:</Text>
                        <Text style={styles.fieldContent}>{item.notes}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 18,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#006699',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#006699',
    },
    doctorText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f3f5',
        marginBottom: 10,
    },
    fieldTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#212529',
        marginTop: 4,
    },
    fieldContent: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 6,
        lineHeight: 20,
    },
});

export default MedicalHistoryScreen;
