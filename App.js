import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './frontend/src/screens/context/UserContext';
import { ThemeProvider } from './frontend/src/screens/context/ThemeContext';
import AppNavigation from './AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;