import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { authFetch } from '../config/api';

const LoginScreen = () => {
  // Estados para capturar lo que el usuario escribe (credenciales quemadas para Alex)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  // verificar si hay token
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); 
        const storedUser = await AsyncStorage.getItem('user');

        if (token) { 
          if (setUser && storedUser) {
            setUser({ username: storedUser });
          }
          navigation.replace('Main');
          return;
        }
      } catch (error) {
        console.log('Error verificando token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);



  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await authFetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nombreUsuario: username.trim(), 
            contraseña: password,
            contrasena: password,
            password: password 
          }),
        });
        const data = await res.json();
        if (res.status === 200 && data.token) {
          await AsyncStorage.setItem('user', username.trim());
          await AsyncStorage.setItem('token', data.token);
          setUser({ username: username.trim() });
          navigation.replace('Main');
          return;
        }
      } catch (e) {
        console.log('Backend offline o error, usando fallback local:', e);
      }

      // Modo fallback
      await AsyncStorage.setItem('user', username.trim());
      await AsyncStorage.setItem('token', 'fake-token-12345');
      setUser({ username: username.trim() });
      navigation.replace('Main');
      return;
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <ActivityIndicator size="large" color="#5A189A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Image source={require('../../../assets/catLogo.png')} style={styles.logo} />
          {/* Título */}
          <Text style={styles.title}>Iniciar Sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // Oculta el texto para la contraseña
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          {/* Botón: Ir a Registro */}
          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLinkText}>
              ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos basados en la imagen proporcionada
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fondo gris muy claro
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 4,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    // Sombra sutil para darle profundidad a los inputs
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Sombra para Android
  },
  button: {
    backgroundColor: '#5A189A',
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  registerLinkText: {
    fontSize: 15,
    color: '#666',
  },
  registerLinkBold: {
    color: '#5A189A',
    fontWeight: 'bold',
  },
});

export default LoginScreen;