import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Cargar preferencia guardada al iniciar la aplicación
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('darkMode');
                if (storedTheme !== null) {
                    setDarkMode(storedTheme === 'true');
                }
            } catch (error) {
                console.log('Error cargando tema desde AsyncStorage:', error);
            }
        };

        loadTheme();
    }, []);

    // Alternar modo oscuro y guardar en AsyncStorage
    const toggleDarkMode = async () => {
        const newValue = !darkMode;
        setDarkMode(newValue);
        try {
            await AsyncStorage.setItem('darkMode', newValue.toString());
        } catch (error) {
            console.log('Error guardando tema en AsyncStorage:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
