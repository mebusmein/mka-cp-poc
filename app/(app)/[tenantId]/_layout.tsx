import { Stack, Slot, useLocalSearchParams, router } from 'expo-router';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { usePlatform } from '@/hooks/usePlatform';
import { useSession } from '@/contexts/AuthContext';

type NavItem = {
  name: string;
  href: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const NAV_ITEMS: NavItem[] = [
  { name: 'dashboard', href: 'dashboard', title: 'Dashboard', icon: 'grid-outline' },
  { name: 'diensten', href: 'diensten', title: 'Diensten', icon: 'briefcase-outline' },
  { name: 'chats', href: 'chats', title: 'Chats', icon: 'chatbubbles-outline' },
  { name: 'dossier', href: 'dossier', title: 'Dossier', icon: 'folder-outline' },
];

function MobileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="dienst-detail/[dienstId]" />
      <Stack.Screen name="chats" />
      <Stack.Screen name="create-modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

function DesktopSidebar() {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();
  const { user, selectedTenant, logout } = useSession();

  const handleNavigation = (href: string) => {
    router.push(`/(app)/${tenantId}/${href}`);
  };

  const handleCreate = () => {
    router.push(`/(app)/${tenantId}/create-modal`);
  };

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/auth');
  };

  const handleSwitchTenant = () => {
    router.replace('/(app)/tenant-select');
  };

  return (
    <View className="w-64 border-r border-slate-800 bg-slate-950">
      {/* Tenant Header */}
      <View className="border-b border-slate-800 p-6">
        <Pressable
          onPress={handleSwitchTenant}
          className="flex-row items-center rounded-lg bg-slate-800/50 p-3 active:bg-slate-800">
          <View className="h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20">
            <Ionicons name="business" size={20} color="#818cf8" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-sm font-semibold text-white" numberOfLines={1}>
              {selectedTenant?.name || 'Select Tenant'}
            </Text>
            <Text className="text-xs text-slate-500">{tenantId}</Text>
          </View>
          <Ionicons name="chevron-expand" size={16} color="#64748b" />
        </Pressable>
      </View>

      {/* Navigation */}
      <ScrollView className="flex-1 justify-center p-4">
        <View className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <Pressable
              key={item.name}
              onPress={() => handleNavigation(item.href)}
              className="mb-1 flex-row items-center rounded-lg px-4 py-3 active:bg-slate-800">
              <Ionicons name={item.icon} size={20} color="#94a3b8" />
              <Text className="ml-3 text-sm font-medium text-slate-400">{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="border-t border-slate-800 p-4">
        {/* Create Button */}
        <Pressable
          onPress={handleCreate}
          className="flex-row items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 active:bg-indigo-600">
          <Ionicons name="add" size={20} color="white" />
          <Text className="ml-2 text-sm font-semibold text-white">Nieuw maken</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DesktopLayout() {
  return (
    <View className="flex-1 flex-row bg-slate-900">
      <DesktopSidebar />
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
}

export default function TenantLayout() {
  const { isDesktopWeb } = usePlatform();

  if (isDesktopWeb) {
    return <DesktopLayout />;
  }

  return <MobileLayout />;
}
