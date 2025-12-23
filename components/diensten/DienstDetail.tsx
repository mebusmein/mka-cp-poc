import { View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getServiceById, Service } from '@/data/services';

type DienstDetailProps = {
  dienstId: string;
  showBackButton?: boolean;
  showSafeArea?: boolean;
};

function EmptyState({ onBack }: { onBack?: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Ionicons name="briefcase-outline" size={48} color="#475569" />
      <Text className="mt-4 text-lg text-slate-400">Selecteer een dienst</Text>
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

function NotFound({ onBack }: { onBack?: () => void }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Ionicons name="alert-circle-outline" size={48} color="#64748b" />
      <Text className="mt-4 text-lg text-slate-400">Dienst niet gevonden</Text>
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

function DetailContent({
  service,
  showBackButton,
}: {
  service: Service;
  showBackButton?: boolean;
}) {
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
        <View className="flex-1">
          <Text className="text-xl font-bold text-white">{service.title}</Text>
          <Text className="text-sm text-slate-400">{service.description}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-6">
        {/* Hero Icon */}
        <View className="mb-6 items-center">
          <View
            className="h-24 w-24 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${service.color}20` }}>
            <Ionicons name={service.icon} size={48} color={service.color} />
          </View>
        </View>

        {/* Details Section */}
        <View className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <Text className="mb-2 text-lg font-semibold text-white">Over deze dienst</Text>
          <Text className="leading-6 text-slate-300">{service.details}</Text>
        </View>

        {/* Info Cards */}
        <View className="mt-6 flex-row flex-wrap">
          <View className="mb-4 w-1/2 pr-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="time-outline" size={24} color={service.color} />
              <Text className="mt-2 text-sm text-slate-400">Beschikbaarheid</Text>
              <Text className="text-base font-medium text-white">Ma - Za</Text>
            </View>
          </View>
          <View className="mb-4 w-1/2 pl-2">
            <View className="rounded-xl border border-slate-700 bg-slate-800 p-4">
              <Ionicons name="location-outline" size={24} color={service.color} />
              <Text className="mt-2 text-sm text-slate-400">Locatie</Text>
              <Text className="text-base font-medium text-white">Aan huis</Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <Pressable
          className="mt-6 rounded-xl py-4 active:opacity-80"
          style={{ backgroundColor: service.color }}>
          <Text className="text-center text-lg font-semibold text-white">Dienst aanvragen</Text>
        </Pressable>

        <View className="h-8" />
      </ScrollView>
    </>
  );
}

export function DienstDetail({
  dienstId,
  showBackButton = true,
  showSafeArea = true,
}: DienstDetailProps) {
  const service = dienstId ? getServiceById(dienstId) : undefined;

  const handleBack = () => {
    router.back();
  };

  const Container = showSafeArea ? SafeAreaView : View;
  const containerProps = showSafeArea ? { edges: ['top'] as const } : {};

  if (!dienstId) {
    return (
      <Container className="flex-1 bg-slate-900" {...containerProps}>
        <EmptyState />
      </Container>
    );
  }

  if (!service) {
    return (
      <Container className="flex-1 bg-slate-900" {...containerProps}>
        <NotFound onBack={showBackButton ? handleBack : undefined} />
      </Container>
    );
  }

  return (
    <Container className="flex-1 bg-slate-900" {...containerProps}>
      <DetailContent service={service} showBackButton={showBackButton} />
    </Container>
  );
}
