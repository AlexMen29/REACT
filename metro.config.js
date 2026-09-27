const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Permitir que Metro resuelva archivos .wasm para expo-sqlite en Web
config.resolver.assetExts.push('wasm');

module.exports = config;
