import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSession } from '@/contexts/AuthContext';
import { usePlatform } from '@/hooks/usePlatform';

export default function DashboardScreen() {
  const { tenantId } = useLocalSearchParams<{ tenantId: string }>();
  const { user, selectedTenant, logout } = useSession();
  const { isDesktopWeb } = usePlatform();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/auth');
  };

  const handleSwitchTenant = () => {
    router.replace('/(app)/tenant-select');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={isDesktopWeb ? [] : ['top']}>
      {/* Header - hide on desktop since sidebar has user info */}
      {!isDesktopWeb && (
        <View className="border-b border-slate-800 px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-slate-400">Welcome back,</Text>
              <Text className="text-xl font-bold text-white">{user?.name}</Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Pressable
                onPress={handleSwitchTenant}
                className="mr-2 rounded-lg bg-slate-800 p-2 active:bg-slate-700">
                <Ionicons name="swap-horizontal" size={20} color="#94a3b8" />
              </Pressable>
              <Pressable
                onPress={handleLogout}
                className="rounded-lg bg-slate-800 p-2 active:bg-slate-700">
                <Ionicons name="log-out-outline" size={20} color="#94a3b8" />
              </Pressable>
            </View>
          </View>
          <View className="mt-3 flex-row items-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2">
            <Ionicons name="business" size={16} color="#818cf8" />
            <Text className="ml-2 text-sm font-medium text-indigo-300">
              {selectedTenant?.name || tenantId}
            </Text>
          </View>
        </View>
      )}

      {/* Content */}
      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="mb-6 text-2xl font-bold text-white">Dashboard</Text>

        {/* Stats Grid */}
        <View className="-mx-2 flex-row flex-wrap">
          <View className="mb-4 w-1/2 px-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="people-outline" size={24} color="#818cf8" />
              <Text className="mt-2 text-3xl font-bold text-white">128</Text>
              <Text className="text-sm text-slate-400">Active Clients</Text>
            </View>
          </View>
          <View className="mb-4 w-1/2 px-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="calendar-outline" size={24} color="#34d399" />
              <Text className="mt-2 text-3xl font-bold text-white">24</Text>
              <Text className="text-sm text-slate-400">This Week</Text>
            </View>
          </View>
          <View className="mb-4 w-1/2 px-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="checkmark-circle-outline" size={24} color="#fbbf24" />
              <Text className="mt-2 text-3xl font-bold text-white">89%</Text>
              <Text className="text-sm text-slate-400">Completion</Text>
            </View>
          </View>
          <View className="mb-4 w-1/2 px-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="trending-up-outline" size={24} color="#f472b6" />
              <Text className="mt-2 text-3xl font-bold text-white">+12%</Text>
              <Text className="text-sm text-slate-400">Growth</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-8 mt-4">
          <Text className="mb-4 text-lg font-semibold text-white">Recent Activity</Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="mb-3 flex-row items-center rounded-xl border border-slate-700 bg-slate-800 p-4">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                <Ionicons name="document-text-outline" size={20} color="#818cf8" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="font-medium text-white">New dossier created</Text>
                <Text className="text-sm text-slate-400">{item} hour ago</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
