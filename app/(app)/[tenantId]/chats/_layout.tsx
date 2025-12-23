import { Slot, Stack, usePathname } from 'expo-router';
import { View } from 'react-native';

import { ChatList } from '@/components/chat/ChatList';
import { usePlatform } from '@/hooks/usePlatform';

export default function ChatsLayout() {
  const { isDesktopWeb } = usePlatform();
  const pathname = usePathname();

  // Check if we're on a detail page
  const chatIdMatch = pathname.match(/\/chats\/([^/]+)$/);
  const hasChatSelected = !!chatIdMatch?.[1];

  if (isDesktopWeb) {
    return (
      <View className="flex-1 flex-row bg-slate-900">
        {/* List Panel - fixed width */}
        <View className={hasChatSelected ? 'w-96 border-r border-slate-800' : 'flex-1'}>
          <ChatList showSafeArea={false} compact={hasChatSelected} />
        </View>

        {/* Detail Panel - takes remaining space when a chat is selected */}
        {hasChatSelected && (
          <View className="flex-1">
            <Slot />
          </View>
        )}
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
