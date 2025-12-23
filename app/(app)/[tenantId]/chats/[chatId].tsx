import { useLocalSearchParams } from 'expo-router';

import { ChatDetail } from '@/components/chat/ChatDetail';
import { usePlatform } from '@/hooks/usePlatform';

export default function ChatDetailScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const { isDesktopWeb } = usePlatform();

  return <ChatDetail chatId={chatId} showBackButton={!isDesktopWeb} showSafeArea={!isDesktopWeb} />;
}
