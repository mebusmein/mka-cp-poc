import { Stack, Redirect } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useSession();

  // If not authenticated, redirect to auth
  if (!isLoading && !isAuthenticated) {
    return <Redirect href="/(auth)/auth" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="tenant-select" />
      <Stack.Screen name="[tenantId]" />
    </Stack>
  );
}
