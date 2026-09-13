import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import PatientsScreen from './frontend/src/screens/PatientsScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';
import HelpScreen from './frontend/src/screens/HelpScreen';
import AppointmentScreen from './frontend/src/screens/AppointmentScreen';
import MedicalHistoryScreen from './frontend/src/screens/MedicalHistoryScreen';
import { ThemeContext } from './frontend/src/screens/context/ThemeContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Pestañas inferiores (Tabs)
const AppTabs = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkMode ? '#222' : '#eaeeffff' },
        headerTintColor: darkMode ? '#eaeeffff' : '#222',
        tabBarStyle: { backgroundColor: darkMode ? '#222' : '#eaeeffff' },
        tabBarActiveTintColor: darkMode ? '#eaeeffff' : '#005187',
        tabBarInactiveTintColor: darkMode ? '#888' : 'gray',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Citas" 
        component={AppointmentScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Historial" 
        component={MedicalHistoryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Menú lateral (Drawer)
const DrawerNavigator = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      screenOptions={{
        headerStyle: { backgroundColor: darkMode ? '#222' : '#ffffff' },
        headerTintColor: darkMode ? '#eaeeffff' : '#222',
        drawerStyle: { backgroundColor: darkMode ? '#1e1e1e' : '#ffffff' },
        drawerActiveTintColor: darkMode ? '#4dabf7' : '#005187',
        drawerInactiveTintColor: darkMode ? '#adb5bd' : '#333333',
      }}
    >
      <Drawer.Screen name="Principal" component={AppTabs} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Pacientes" component={PatientsScreen} />
      <Drawer.Screen name="Configuracion" component={SettingsScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

// Navegación principal (Stack)
const AppNavigation = () => {
  const { darkMode } = useContext(ThemeContext);

  const customTheme = {
    ...(darkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(darkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: darkMode ? '#121212' : '#f5f5f5',
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
