import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Image, 
  Alert, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { authFetch } from '../config/api';

const RegisterScreen = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [rol, setRol] = useState('user');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const showAlert = (title, message) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
      window.alert(`${title ? title + ': ' : ''}${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleRegister = async () => {
    // Validaciones básicas
    if (!nombreUsuario.trim() || !contraseña || !confirmarContraseña) {
      showAlert('Aviso', 'Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const response = await authFetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario: nombreUsuario.trim(),
          contraseña: contraseña,
          contrasena: contraseña,
          password: contraseña,
          rol: rol,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        if (Platform.OS === 'web') {
          showAlert('¡Registro Exitoso!', data.mensaje || 'Usuario registrado exitosamente');
          navigation.navigate('Login');
        } else {
          Alert.alert(
            '¡Registro Exitoso!',
            data.mensaje || 'Usuario registrado exitosamente',
            [
              { 
                text: 'Ir a Iniciar Sesión', 
                onPress: () => navigation.navigate('Login') 
              }
            ]
          );
        }
      } else {
        showAlert('Aviso', data.mensaje || 'No se pudo completar el registro');
      }
    } catch (error) {
      console.log('Error de red al registrar:', error);
      showAlert('Error de conexión', 'No se pudo conectar con el servidor backend (puerto 5000). Asegúrate de que el backend esté corriendo en tu PC.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={require('../../../assets/catLogo.png')} style={styles.logo} />
          
          <Text style={styles.title}>Crear Cuenta</Text>

          {/* Nombre de usuario */}
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#999"
            value={nombreUsuario}
            onChangeText={setNombreUsuario}
            autoCapitalize="none"
          />

          {/* Contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry={true}
          />

          {/* Confirmar Contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#999"
            value={confirmarContraseña}
            onChangeText={setConfirmarContraseña}
            secureTextEntry={true}
          />

          {/* Selector de Rol */}
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Rol del usuario:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity 
                style={[styles.roleButton, rol === 'user' && styles.roleButtonActive]} 
                onPress={() => setRol('user')}
              >
                <Text style={[styles.roleButtonText, rol === 'user' && styles.roleButtonTextActive]}>
                  Usuario
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.roleButton, rol === 'admin' && styles.roleButtonActive]} 
                onPress={() => setRol('admin')}
              >
                <Text style={[styles.roleButtonText, rol === 'admin' && styles.roleButtonTextActive]}>
                  Admin
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón de Registro */}
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Registrarse</Text>
            )}
          </TouchableOpacity>

          {/* Enlace para volver a Iniciar Sesión */}
          <TouchableOpacity style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>
              ¿Ya tienes una cuenta? <Text style={styles.loginLinkBold}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 40,
    paddingVertical: 30,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 14,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#5A189A',
  },
  roleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#5A189A',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 22,
    alignItems: 'center',
    paddingBottom: 20,
  },
  loginLinkText: {
    fontSize: 15,
    color: '#666',
  },
  loginLinkBold: {
    color: '#5A189A',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
