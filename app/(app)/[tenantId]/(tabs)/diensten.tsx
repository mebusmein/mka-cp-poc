import { DienstenList } from '@/components/diensten/DienstenList';
import { usePlatform } from '@/hooks/usePlatform';

export default function DienstenScreen() {
  const { isDesktopWeb } = usePlatform();

  return <DienstenList showSafeArea={!isDesktopWeb} />;
}
