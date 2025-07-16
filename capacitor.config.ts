import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.venezuela.ett',
  appName: 'Ett Venezuela',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',   // ¡deja https para que cargue bien en Android!
    cleartext: true,
  },
  ios: {
    scheme: 'ettvenezuela',   // iOS puede usar esquema personalizado
  },
};

export default config;
