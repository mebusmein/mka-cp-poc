import { View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router, useSegments, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SERVICES } from '@/data/services';

type DienstenListProps = {
  compact?: boolean;
  showSafeArea?: boolean;
};

export function DienstenList({ compact = false, showSafeArea = true }: DienstenListProps) {
  const { tenantId } = useLocalSearchParams<{ tenantId: string; dienstId?: string }>();
  const pathname = usePathname();
  const segments = useSegments();

  // Check if we're on a detail page by looking at the path
  // The path will be like /tenant-1/diensten/1 when viewing a detail
  const dienstIdMatch = pathname.match(/\/diensten\/([^/]+)$/);
  const dienstId = dienstIdMatch?.[1];

  const handleSelectService = (serviceId: string) => {
    router.push(`/(app)/${tenantId}/dienst-detail/${serviceId}`);
  };

  const Container = showSafeArea ? SafeAreaView : View;
  const containerProps = showSafeArea ? { edges: ['top'] as const } : {};

  return (
    <Container className="flex-1 bg-slate-900" {...containerProps}>
      {/* Header */}
      <View className="border-b border-slate-800 px-6 py-4">
        <Text className="text-2xl font-bold text-white">Diensten</Text>
        {!compact && <Text className="mt-1 text-slate-400">Beschikbare zorgdiensten</Text>}
      </View>

      {/* Services List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {SERVICES.map((service) => {
          const isSelected = dienstId === service.id;

          return (
            <Pressable
              key={service.id}
              onPress={() => handleSelectService(service.id)}
              className={`mb-3 flex-row items-center rounded-xl border p-4 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-800 active:bg-slate-700'
              }`}>
              <View
                className="h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${service.color}20` }}>
                <Ionicons name={service.icon} size={24} color={service.color} />
              </View>
              <View className="ml-4 flex-1">
                <Text
                  className={`text-base font-semibold ${
                    isSelected ? 'text-indigo-300' : 'text-white'
                  }`}>
                  {service.title}
                </Text>
                {!compact && (
                  <Text className="mt-0.5 text-sm text-slate-400">{service.description}</Text>
                )}
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isSelected ? '#818cf8' : '#64748b'}
              />
            </Pressable>
          );
        })}
        <View className="h-8" />
      </ScrollView>
    </Container>
  );
}
