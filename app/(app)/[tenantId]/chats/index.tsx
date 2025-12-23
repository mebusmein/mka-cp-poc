import { ChatList } from '@/components/chat/ChatList';
import { usePlatform } from '@/hooks/usePlatform';

export default function ChatsIndexScreen() {
  const { isDesktopWeb } = usePlatform();

  // On desktop, the list is rendered in the layout
  if (isDesktopWeb) {
    return null;
  }

  return <ChatList showSafeArea={true} />;
}
