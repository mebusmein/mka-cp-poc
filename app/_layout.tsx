import '../global.css';
import '../translation';

import { Slot } from 'expo-router';

import { SessionProvider } from '@/contexts/AuthContext';
import { SplashScreenController } from '@/components/app/Splash';

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <Slot />
    </SessionProvider>
  );
}
