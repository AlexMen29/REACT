import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>
      <Text style={styles.text}>Si tienes problemas con la aplicación, por favor contacta a soporte.</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0056b3',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default HelpScreen;
