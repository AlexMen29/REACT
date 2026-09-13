import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './context/ThemeContext';

const HelpScreen = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <Text style={[styles.title, darkMode && styles.titleDark]}>Centro de Ayuda</Text>
      <Text style={[styles.text, darkMode && styles.textDark]}>
        Si tienes problemas con la aplicación, por favor contacta a soporte.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0056b3',
  },
  titleDark: {
    color: '#4dabf7',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  textDark: {
    color: '#adb5bd',
  },
});

export default HelpScreen;
