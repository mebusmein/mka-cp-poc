import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useSession();

  // If authenticated, redirect to app
  if (!isLoading && isAuthenticated) {
    return <Redirect href="/(app)/tenant-select" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
    </Stack>
  );
}

