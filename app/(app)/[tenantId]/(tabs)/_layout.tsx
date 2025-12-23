import { Tabs, useLocalSearchParams, router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { usePlatform } from '@/hooks/usePlatform';

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

function TabIcon({ name, color, size }: TabIconProps) {
  return <Ionicons name={name} size={size} color={color} />;
}

function CreateButton() {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();

  const handlePress = () => {
    router.push(`/(app)/${tenantId}/create-modal`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className="h-14 w-14 items-center justify-center rounded-full bg-indigo-500 shadow-lg active:bg-indigo-600">
      <Ionicons name="add" size={32} color="white" />
    </Pressable>
  );
}

export default function TabsLayout() {
  const { isDesktopWeb } = usePlatform();

  // On desktop, tabs are hidden (sidebar handles navigation)
  if (isDesktopWeb) {
    return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}>
        <Tabs.Screen name="dashboard" />
        <Tabs.Screen name="diensten" />
        <Tabs.Screen name="chats" />
        <Tabs.Screen name="dossier" />
      </Tabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopColor: '#1e293b',
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#818cf8',
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="grid-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="diensten"
        options={{
          title: 'Diensten',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: '',
          tabBarButton: () => (
            <View className="flex-1 items-center justify-center">
              <CreateButton />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="chatbubbles-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dossier"
        options={{
          title: 'Dossier',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="folder-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
