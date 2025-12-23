import { useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Tenant, useSession } from '@/contexts/AuthContext';
import { usePlatform } from '@/hooks/usePlatform';

export default function TenantSelectScreen() {
  const { tenants, selectTenant, user, logout } = useSession();
  const { isDesktopWeb } = usePlatform();

  // Auto-redirect if only one tenant
  useEffect(() => {
    if (tenants.length === 1) {
      const tenant = tenants[0];
      selectTenant(tenant);
      router.replace(`/(app)/${tenant.id}/dashboard`);
    }
  }, [tenants, selectTenant]);

  const handleSelectTenant = (tenant: Tenant) => {
    selectTenant(tenant);
    router.replace(`/(app)/${tenant.id}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/auth');
  };

  // Show loading while auto-redirecting
  if (tenants.length === 1) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-lg text-white">Redirecting...</Text>
      </View>
    );
  }

  const content = (
    <>
      {/* Header */}
      <View className={isDesktopWeb ? 'mb-6' : 'border-b border-slate-800 px-8 pb-8 pt-16'}>
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-slate-400">Logged in as</Text>
            <Text className="text-base font-medium text-white">{user?.email}</Text>
          </View>
          <Pressable
            onPress={handleLogout}
            className="rounded-lg bg-slate-800 px-4 py-2 active:bg-slate-700">
            <Text className="text-sm text-slate-300">Logout</Text>
          </Pressable>
        </View>
        <Text className="text-3xl font-bold text-white">Select Organization</Text>
        <Text className="mt-2 text-slate-400">Choose the organization you want to access</Text>
      </View>

      {/* Tenant List */}
      <View className={isDesktopWeb ? '' : 'flex-1 px-8 pt-6'}>
        <View className="space-y-3">
          {tenants.map((tenant) => (
            <Pressable
              key={tenant.id}
              onPress={() => handleSelectTenant(tenant)}
              className="mb-3 flex-row items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-5 active:bg-slate-700">
              <View className="flex-1 flex-row items-center">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
                  <Ionicons name="business" size={24} color="#818cf8" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-white">{tenant.name}</Text>
                  <Text className="text-sm text-slate-400">{tenant.id}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );

  if (isDesktopWeb) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <View className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          {content}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900">
      <ScrollView className="flex-1">{content}</ScrollView>
    </View>
  );
}
