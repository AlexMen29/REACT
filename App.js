import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LoginScreen from './frontend/src/screens/LoginScreen';
import HomeScreen from './frontend/src/screens/HomeScreen';
import ProfileScreen from './frontend/src/screens/ProfileScreen';
import PatientsScreen from './frontend/src/screens/PatientsScreen';
import SettingsScreen from './frontend/src/screens/SettingsScreen';
import HelpScreen from './frontend/src/screens/HelpScreen';
import AppointmentScreen from './frontend/src/screens/AppointmentScreen';
import MedicalHistoryScreen from './frontend/src/screens/MedicalHistoryScreen';
import { UserProvider } from './frontend/src/screens/context/UserContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Citas') iconName = 'calendar';
          else if (route.name === 'Historial') iconName = 'file-document';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#005187',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Citas" component={AppointmentScreen} />
      <Tab.Screen name="Historial" component={MedicalHistoryScreen} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Principal">
      <Drawer.Screen name="Principal" component={TabNavigator} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Pacientes" component={PatientsScreen} />
      <Drawer.Screen name="Configuracion" component={SettingsScreen} />
      <Drawer.Screen name="Ayuda" component={HelpScreen} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;