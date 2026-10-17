import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from './context/ThemeContext';
import { apiFetch } from '../config/api';

const DoctorsScreen = () => {
  const { darkMode } = useContext(ThemeContext);

  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [editingId, setEditingId] = useState(null);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
      window.alert(`${title ? title + ': ' : ''}${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Cargar lista de médicos desde MongoDB Atlas (GET)
  const fetchMedicos = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/medicos');
      const data = await res.json();
      if (res.ok) {
        setMedicos(data);
      } else {
        showAlert('Aviso', data.message || 'Error al obtener médicos');
      }
    } catch (error) {
      console.log('Error al cargar médicos:', error);
      showAlert('Error de conexión', 'No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicos();
  }, []);

  // Crear o actualizar médico (POST / PUT)
  const handleSubmit = async () => {
    if (!nombre.trim() || !especialidad.trim() || !telefono.trim()) {
      showAlert('Campos requeridos', 'Por favor completa todos los campos del médico.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        // PUT /api/medicos/:id
        const res = await apiFetch(`/api/medicos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombre.trim(),
            especialidad: especialidad.trim(),
            telefono: telefono.trim(),
          }),
        });

        if (res.ok) {
          showAlert('Éxito', 'Médico actualizado correctamente');
          resetForm();
          fetchMedicos();
        } else {
          const err = await res.json();
          showAlert('Error', err.message || 'No se pudo actualizar el médico');
        }
      } else {
        // POST /api/medicos
        const res = await apiFetch('/api/medicos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: nombre.trim(),
            especialidad: especialidad.trim(),
            telefono: telefono.trim(),
          }),
        });

        if (res.ok) {
          showAlert('Éxito', 'Médico registrado en MongoDB exitosamente');
          resetForm();
          fetchMedicos();
        } else {
          const err = await res.json();
          showAlert('Error', err.message || 'No se pudo registrar el médico');
        }
      }
    } catch (error) {
      console.log('Error guardando médico:', error);
      showAlert('Error', 'No se pudo conectar con el backend.');
    } finally {
      setSubmitting(false);
    }
  };

  // Cargar datos en el formulario para editar
  const handleEdit = (medico) => {
    setEditingId(medico._id);
    setNombre(medico.nombre || '');
    setEspecialidad(medico.especialidad || '');
    setTelefono(medico.telefono || '');
  };

  // Cancelar modo edición
  const resetForm = () => {
    setEditingId(null);
    setNombre('');
    setEspecialidad('');
    setTelefono('');
  };

  // Eliminar médico (DELETE)
  const handleDelete = async (id, medicoNombre) => {
    const executeDelete = async () => {
      try {
        const res = await apiFetch(`/api/medicos/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          showAlert('Eliminado', `Médico ${medicoNombre} eliminado`);
          if (editingId === id) resetForm();
          fetchMedicos();
        } else {
          showAlert('Error', 'No se pudo eliminar el médico');
        }
      } catch (error) {
        showAlert('Error', 'Error de conexión al eliminar');
      }
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm ? window.confirm(`¿Seguro que deseas eliminar a ${medicoNombre}?`) : true;
      if (confirmed) executeDelete();
    } else {
      Alert.alert(
        'Confirmar eliminación',
        `¿Deseas eliminar al médico ${medicoNombre}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', style: 'destructive', onPress: executeDelete },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={[styles.title, darkMode && styles.textDark]}>
            Gestión de Médicos (API REST)
          </Text>
          <TouchableOpacity onPress={fetchMedicos} style={styles.refreshBtn}>
            <MaterialCommunityIcons name="refresh" size={24} color={darkMode ? '#eaeeff' : '#005187'} />
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={[styles.formCard, darkMode && styles.cardDark]}>
          <Text style={[styles.formTitle, darkMode && styles.textDark]}>
            {editingId ? 'Editar Médico' : 'Registrar Nuevo Médico'}
          </Text>

          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            placeholder="Nombre del médico (ej: Dra. Sofía Ramos)"
            placeholderTextColor={darkMode ? '#888' : '#999'}
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            placeholder="Especialidad (ej: Pediatría, Neonatología)"
            placeholderTextColor={darkMode ? '#888' : '#999'}
            value={especialidad}
            onChangeText={setEspecialidad}
          />

          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            placeholder="Teléfono (ej: 7890-1234)"
            placeholderTextColor={darkMode ? '#888' : '#999'}
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="phone-pad"
          />

          <View style={styles.formButtonsRow}>
            <TouchableOpacity 
              style={[styles.saveBtn, submitting && { opacity: 0.7 }]} 
              onPress={handleSubmit}
              disabled={submitting}
            >
              <MaterialCommunityIcons 
                name={editingId ? 'check' : 'plus'} 
                size={20} 
                color="#fff" 
                style={{ marginRight: 6 }} 
              />
              <Text style={styles.saveBtnText}>
                {submitting ? 'Guardando...' : (editingId ? 'Actualizar' : 'Guardar Médico')}
              </Text>
            </TouchableOpacity>

            {editingId && (
              <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Lista de Médicos */}
        <View style={styles.listContainer}>
          <Text style={[styles.subTitle, darkMode && styles.textDark]}>
            Médicos Registrados ({medicos.length})
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="#005187" style={{ marginTop: 20 }} />
          ) : medicos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="doctor" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No hay médicos registrados aún en la base de datos.</Text>
            </View>
          ) : (
            <FlatList
              data={medicos}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <View style={[styles.doctorCard, darkMode && styles.cardDark]}>
                  <View style={styles.avatarCircle}>
                    <MaterialCommunityIcons name="doctor" size={26} color="#005187" />
                  </View>
                  <View style={styles.doctorInfo}>
                    <Text style={[styles.doctorName, darkMode && styles.textDark]}>{item.nombre}</Text>
                    <Text style={styles.doctorSpecialty}>{item.especialidad}</Text>
                    <Text style={styles.doctorPhone}>📞 {item.telefono}</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity 
                      style={styles.iconBtnEdit} 
                      onPress={() => handleEdit(item)}
                    >
                      <MaterialCommunityIcons name="pencil" size={20} color="#005187" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.iconBtnDelete} 
                      onPress={() => handleDelete(item._id, item.nombre)}
                    >
                      <MaterialCommunityIcons name="trash-can" size={20} color="#d90429" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#005187',
  },
  textDark: {
    color: '#eaeeff',
  },
  refreshBtn: {
    padding: 6,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDark: {
    backgroundColor: '#1E1E1E',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputDark: {
    backgroundColor: '#2A2A2A',
    borderColor: '#444',
    color: '#FFF',
  },
  formButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005187',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  saveBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelBtn: {
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  cancelBtnText: {
    color: '#555',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0EEF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#005187',
    fontWeight: '600',
    marginTop: 2,
  },
  doctorPhone: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtnEdit: {
    padding: 8,
    marginRight: 4,
  },
  iconBtnDelete: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  emptyText: {
    color: '#888',
    marginTop: 10,
    fontSize: 14,
  },
});

export default DoctorsScreen;
