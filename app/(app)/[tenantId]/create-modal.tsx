import { View, Text, Pressable, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUICK_ACTIONS = [
  {
    id: 'new-dossier',
    title: 'Nieuw dossier',
    description: 'Maak een nieuw cliëntdossier aan',
    icon: 'folder-outline' as const,
    color: '#818cf8',
  },
  {
    id: 'new-appointment',
    title: 'Afspraak plannen',
    description: 'Plan een nieuwe afspraak in',
    icon: 'calendar-outline' as const,
    color: '#34d399',
  },
  {
    id: 'new-message',
    title: 'Nieuw bericht',
    description: 'Stuur een bericht naar collega of cliënt',
    icon: 'chatbubble-outline' as const,
    color: '#fbbf24',
  },
  {
    id: 'new-report',
    title: 'Rapportage maken',
    description: 'Maak een nieuwe rapportage aan',
    icon: 'document-text-outline' as const,
    color: '#f472b6',
  },
  {
    id: 'new-task',
    title: 'Taak toevoegen',
    description: 'Voeg een nieuwe taak toe',
    icon: 'checkbox-outline' as const,
    color: '#fb923c',
  },
];

export default function CreateModal() {
  const handleClose = () => {
    router.back();
  };

  const handleAction = (actionId: string) => {
    // For now, just close the modal
    // In real implementation, navigate to the specific creation flow
    console.log('Action selected:', actionId);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900" edges={['top', 'bottom']}>
      {/* Header */}
      <View className="px-6 py-4 border-b border-slate-800 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-white">Nieuw maken</Text>
          <Text className="text-slate-400 mt-1">Kies een actie</Text>
        </View>
        <Pressable
          onPress={handleClose}
          className="w-10 h-10 bg-slate-800 rounded-full items-center justify-center active:bg-slate-700">
          <Ionicons name="close" size={24} color="#94a3b8" />
        </Pressable>
      </View>

      {/* Quick Actions */}
      <ScrollView className="flex-1 px-6 pt-6">
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => handleAction(action.id)}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4 mb-3 flex-row items-center active:bg-slate-700">
            <View
              className="w-14 h-14 rounded-xl items-center justify-center"
              style={{ backgroundColor: `${action.color}20` }}>
              <Ionicons name={action.icon} size={28} color={action.color} />
            </View>
            <View className="flex-1 ml-4">
              <Text className="text-white font-semibold text-lg">{action.title}</Text>
              <Text className="text-slate-400 text-sm mt-0.5">{action.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#64748b" />
          </Pressable>
        ))}

        <View className="h-8" />
      </ScrollView>

      {/* Cancel Button */}
      <View className="px-6 pb-4">
        <Pressable
          onPress={handleClose}
          className="bg-slate-800 border border-slate-700 py-4 rounded-xl active:bg-slate-700">
          <Text className="text-slate-300 text-center font-semibold text-base">Annuleren</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

