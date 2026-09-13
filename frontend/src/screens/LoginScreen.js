import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './context/UserContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  // Estados para capturar lo que el usuario escribe (credenciales quemadas para Alex)
  const [username, setUsername] = useState('alex');
  const [password, setPassword] = useState('123456');
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

          {/* Input: Nombre de usuario */}
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          {/* Input: Contraseña */}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // Oculta el texto para la contraseña
          />

          {/* Botón: Ingresar */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
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
  }
});

export default LoginScreen;