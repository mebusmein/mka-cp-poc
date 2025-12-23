import { DienstenList } from '@/components/diensten/DienstenList';
import { usePlatform } from '@/hooks/usePlatform';
import { Slot, Stack, usePathname, useSegments } from 'expo-router';
import { View } from 'react-native';

export default function DienstDetailLayout() {
  const { isDesktopWeb } = usePlatform();

  if (isDesktopWeb) {
    return (
      <View className="flex-1 flex-row bg-slate-900">
        {/* List Panel - fixed width */}
        <View className="w-96 border-r border-slate-800">
          <DienstenList showSafeArea={false} />
        </View>

        {/* Detail Panel - takes remaining space when a dienst is selected */}
        <View className="flex-1">
          <Slot />
        </View>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
