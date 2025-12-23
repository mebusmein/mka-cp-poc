import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePlatform } from '@/hooks/usePlatform';

const DOSSIERS = [
  {
    id: '1',
    clientName: 'Jan de Vries',
    status: 'active',
    lastUpdate: '2 uur geleden',
    type: 'Thuiszorg',
  },
  {
    id: '2',
    clientName: 'Maria Bakker',
    status: 'active',
    lastUpdate: 'Vandaag',
    type: 'Begeleiding',
  },
  {
    id: '3',
    clientName: 'Pieter Jansen',
    status: 'pending',
    lastUpdate: 'Gisteren',
    type: 'Verpleging',
  },
  {
    id: '4',
    clientName: 'Sophie van Dijk',
    status: 'active',
    lastUpdate: '3 dagen geleden',
    type: 'Dagbesteding',
  },
  {
    id: '5',
    clientName: 'Kees Smit',
    status: 'archived',
    lastUpdate: '1 week geleden',
    type: 'Thuiszorg',
  },
];

const STATUS_COLORS = {
  active: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Actief' },
  pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'In behandeling' },
  archived: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Gearchiveerd' },
};

export default function DossierScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDesktopWeb } = usePlatform();

  const filteredDossiers = DOSSIERS.filter((dossier) =>
    dossier.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={isDesktopWeb ? [] : ['top']}>
      {/* Header */}
      <View className="border-b border-slate-800 px-6 py-4">
        <Text className="text-2xl font-bold text-white">Dossiers</Text>
        <Text className="mt-1 text-slate-400">Cliëntendossiers beheren</Text>

        {/* Search */}
        <View className="mt-4 flex-row items-center rounded-xl border border-slate-700 bg-slate-800 px-4">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 px-3 py-3 text-white"
            placeholder="Zoek op naam..."
            placeholderTextColor="#64748b"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Dossier List */}
      <ScrollView className="flex-1 px-6 pt-6">
        {filteredDossiers.map((dossier) => {
          const statusStyle = STATUS_COLORS[dossier.status as keyof typeof STATUS_COLORS];

          return (
            <Pressable
              key={dossier.id}
              className="mb-3 rounded-xl border border-slate-700 bg-slate-800 p-4 active:bg-slate-700">
              <View className="flex-row items-start justify-between">
                <View className="flex-1 flex-row items-center">
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20">
                    <Text className="font-semibold text-indigo-300">
                      {dossier.clientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Text>
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-base font-semibold text-white">{dossier.clientName}</Text>
                    <Text className="text-sm text-slate-400">{dossier.type}</Text>
                  </View>
                </View>
                <View className={`${statusStyle.bg} rounded-md px-2 py-1`}>
                  <Text className={`${statusStyle.text} text-xs font-medium`}>
                    {statusStyle.label}
                  </Text>
                </View>
              </View>
              <View className="mt-3 flex-row items-center justify-between border-t border-slate-700 pt-3">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#64748b" />
                  <Text className="ml-1 text-xs text-slate-500">
                    Bijgewerkt: {dossier.lastUpdate}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#64748b" />
              </View>
            </Pressable>
          );
        })}

        {filteredDossiers.length === 0 && (
          <View className="items-center justify-center py-12">
            <Ionicons name="folder-open-outline" size={48} color="#475569" />
            <Text className="mt-4 text-center text-slate-400">Geen dossiers gevonden</Text>
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
