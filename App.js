import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './frontend/src/screens/context/UserContext';
import { ThemeProvider } from './frontend/src/screens/context/ThemeContext';
import AppNavigation from './AppNavigation';

import  {SQLiteProvider} from 'expo-sqlite';

import {InitializeDatabase} from './frontend/src/db/Database';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <SQLiteProvider databaseName= 'clinicaPediatrica.db' onInit = {InitializeDatabase}>

          <ThemeProvider>
            <AppNavigation />
          </ThemeProvider>
        </SQLiteProvider>

      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;