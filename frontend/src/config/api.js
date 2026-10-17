import { Platform } from 'react-native';

// IP local de la computadora en la red Wi-Fi
export const PC_IP = '192.168.1.9';

// Servidores base según plataforma
export const getBaseUrls = () => {
  if (Platform.OS === 'web') {
    return [
      'http://localhost:5000',
      `http://${PC_IP}:5000`
    ];
  }
  // En Android / iOS (Expo Go en celular físico o emulador)
  return [
    `http://${PC_IP}:5000`,
    'http://10.0.2.2:5000',
    'http://localhost:5000'
  ];
};

/**
 * Petición genérica a cualquier endpoint de la API probando URLs candidatas
 * Ej: apiFetch('/api/medicos', { method: 'GET' })
 */
export const apiFetch = async (path, options = {}) => {
  const baseUrls = getBaseUrls();
  let lastError = null;

  for (const base of baseUrls) {
    try {
      const response = await fetch(`${base}${path}`, options);
      return response;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
};

/**
 * Petición específica para autenticación
 * Ej: authFetch('/login', { ... })
 */
export const authFetch = async (endpoint, options = {}) => {
  return apiFetch(`/api/auth${endpoint}`, options);
};
