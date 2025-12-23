import { Redirect } from 'expo-router';

import { useSession } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/auth" />;
  }

  return <Redirect href="/(app)/tenant-select" />;
}
