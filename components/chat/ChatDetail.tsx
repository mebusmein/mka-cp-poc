import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getChatById, Chat } from '@/data/chats';

type ChatDetailProps = {
  chatId: string;
  showBackButton?: boolean;
  showSafeArea?: boolean;
};

function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Ionicons name="chatbubbles-outline" size={48} color="#475569" />
      <Text className="mt-4 text-lg text-slate-400">Selecteer een chat</Text>
    </View>
  );
}

function NotFound({ onBack }: { onBack?: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Ionicons name="alert-circle-outline" size={48} color="#64748b" />
      <Text className="mt-4 text-lg text-slate-400">Chat niet gevonden</Text>
      {onBack && (
        <Pressable
          onPress={onBack}
          className="mt-4 rounded-lg bg-slate-800 px-4 py-2 active:bg-slate-700">
          <Text className="text-slate-300">Terug</Text>
        </Pressable>
      )}
    </View>
  );
}

// Mock messages for demo
const MOCK_MESSAGES = [
  { id: '1', text: 'Hallo, hoe gaat het?', isMe: false, time: '10:00' },
  { id: '2', text: 'Goed hoor, en met jou?', isMe: true, time: '10:02' },
  { id: '3', text: 'Prima! Ik wilde even checken hoe het met de afspraak zit.', isMe: false, time: '10:05' },
  { id: '4', text: 'Die staat nog steeds gepland voor morgen om 14:00', isMe: true, time: '10:06' },
  { id: '5', text: 'Perfect, dan zie ik je morgen!', isMe: false, time: '10:08' },
];

function ChatContent({ chat, showBackButton }: { chat: Chat; showBackButton?: boolean }) {
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {/* Header */}
      <View className="flex-row items-center border-b border-slate-800 px-4 py-4">
        {showBackButton && (
          <Pressable
            onPress={handleBack}
            className="mr-3 rounded-lg bg-slate-800 p-2 active:bg-slate-700">
            <Ionicons name="arrow-back" size={20} color="#94a3b8" />
          </Pressable>
        )}
        <View className="h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
          <Text className="text-sm font-semibold text-indigo-300">
            {chat.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Text>
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-lg font-semibold text-white">{chat.name}</Text>
          <Text className="text-xs text-slate-400">Online</Text>
        </View>
        <Pressable className="rounded-lg bg-slate-800 p-2 active:bg-slate-700">
          <Ionicons name="ellipsis-vertical" size={20} color="#94a3b8" />
        </Pressable>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 p-4">
        {MOCK_MESSAGES.map((message) => (
          <View
            key={message.id}
            className={`mb-3 max-w-[80%] ${message.isMe ? 'ml-auto' : 'mr-auto'}`}>
            <View
              className={`rounded-2xl px-4 py-3 ${
                message.isMe
                  ? 'rounded-br-sm bg-indigo-500'
                  : 'rounded-bl-sm bg-slate-800'
              }`}>
              <Text className="text-white">{message.text}</Text>
            </View>
            <Text
              className={`mt-1 text-xs text-slate-500 ${message.isMe ? 'text-right' : 'text-left'}`}>
              {message.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View className="flex-row items-center border-t border-slate-800 px-4 py-3">
        <Pressable className="rounded-lg bg-slate-800 p-2 active:bg-slate-700">
          <Ionicons name="add" size={24} color="#94a3b8" />
        </Pressable>
        <View className="mx-3 flex-1 rounded-xl bg-slate-800 px-4 py-2">
          <TextInput
            className="text-white"
            placeholder="Typ een bericht..."
            placeholderTextColor="#64748b"
          />
        </View>
        <Pressable className="rounded-lg bg-indigo-500 p-2 active:bg-indigo-600">
          <Ionicons name="send" size={24} color="white" />
        </Pressable>
      </View>
    </>
  );
}

export function ChatDetail({ chatId, showBackButton = true, showSafeArea = true }: ChatDetailProps) {
  const chat = chatId ? getChatById(chatId) : undefined;

  const handleBack = () => {
    router.back();
  };

  const Container = showSafeArea ? SafeAreaView : View;
  const containerProps = showSafeArea ? { edges: ['top'] as const } : {};

  if (!chatId) {
    return (
      <Container className="flex-1 bg-slate-900" {...containerProps}>
        <EmptyState />
      </Container>
    );
  }

  if (!chat) {
    return (
      <Container className="flex-1 bg-slate-900" {...containerProps}>
        <NotFound onBack={showBackButton ? handleBack : undefined} />
      </Container>
    );
  }

  return (
    <Container className="flex-1 bg-slate-900" {...containerProps}>
      <ChatContent chat={chat} showBackButton={showBackButton} />
    </Container>
  );
}

