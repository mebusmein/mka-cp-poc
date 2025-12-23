import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CHATS } from '@/data/chats';

type ChatListProps = {
  compact?: boolean;
  showSafeArea?: boolean;
};

export function ChatList({ compact = false, showSafeArea = true }: ChatListProps) {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();
  const pathname = usePathname();

  // Check if we're on a detail page by looking at the path
  const chatIdMatch = pathname.match(/\/chats\/([^/]+)$/);
  const selectedChatId = chatIdMatch?.[1];

  const handleSelectChat = (chatId: string) => {
    router.push(`/(app)/${tenantId}/chats/${chatId}`);
  };

  const Container = showSafeArea ? SafeAreaView : View;
  const containerProps = showSafeArea ? { edges: ['top'] as const } : {};

  return (
    <Container className="flex-1 bg-slate-900" {...containerProps}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-slate-800 px-6 py-4">
        <View>
          <Text className="text-2xl font-bold text-white">Chats</Text>
          {!compact && <Text className="mt-1 text-slate-400">{CHATS.length} gesprekken</Text>}
        </View>
        <Pressable className="rounded-lg bg-slate-800 p-2 active:bg-slate-700">
          <Ionicons name="search" size={20} color="#94a3b8" />
        </Pressable>
      </View>

      {/* Chat List */}
      <ScrollView className="flex-1">
        {CHATS.map((chat) => {
          const isSelected = selectedChatId === chat.id;

          return (
            <Pressable
              key={chat.id}
              onPress={() => handleSelectChat(chat.id)}
              className={`flex-row items-center border-b border-slate-800/50 px-6 py-4 ${
                isSelected ? 'bg-indigo-500/10' : 'active:bg-slate-800/50'
              }`}>
              {/* Avatar */}
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${
                  isSelected ? 'bg-indigo-500/30' : 'bg-indigo-500/20'
                }`}>
                <Text
                  className={`text-lg font-semibold ${
                    isSelected ? 'text-indigo-200' : 'text-indigo-300'
                  }`}>
                  {chat.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </Text>
              </View>

              {/* Content */}
              <View className="ml-4 flex-1">
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`font-semibold ${isSelected ? 'text-indigo-300' : 'text-white'}`}>
                    {chat.name}
                  </Text>
                  <Text className="text-xs text-slate-500">{chat.time}</Text>
                </View>
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="mr-2 flex-1 text-sm text-slate-400" numberOfLines={1}>
                    {chat.lastMessage}
                  </Text>
                  {chat.unread > 0 && (
                    <View className="h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                      <Text className="text-xs font-semibold text-white">{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </Container>
  );
}

