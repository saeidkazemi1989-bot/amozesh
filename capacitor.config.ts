import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.ghadam.mobile',
  appName: 'قدم',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
    backgroundColor: '#f7f8f4',
  },
  plugins: { LocalNotifications: { smallIcon: 'ic_stat_ghadam', iconColor: '#2D6049' } },
  server: {
    androidScheme: 'https',
  },
};

export default config;
