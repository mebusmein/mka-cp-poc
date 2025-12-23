import { ChatList } from '@/components/chat/ChatList';
import { usePlatform } from '@/hooks/usePlatform';

export default function ChatsScreen() {
  const { isDesktopWeb } = usePlatform();

  return <ChatList showSafeArea={!isDesktopWeb} />;
}
