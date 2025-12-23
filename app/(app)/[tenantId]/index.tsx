import { Redirect, useLocalSearchParams } from 'expo-router';

export default function TenantIndex() {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();

  return <Redirect href={`/(app)/${tenantId}/dashboard`} />;
}
