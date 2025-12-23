import { useLocalSearchParams } from 'expo-router';

import { DienstDetail } from '@/components/diensten/DienstDetail';
import { usePlatform } from '@/hooks/usePlatform';

export default function DienstDetailScreen() {
  const { dienstId } = useLocalSearchParams<{ dienstId: string }>();
  const { isDesktopWeb } = usePlatform();

  return (
    <DienstDetail dienstId={dienstId} showBackButton={!isDesktopWeb} showSafeArea={!isDesktopWeb} />
  );
}
