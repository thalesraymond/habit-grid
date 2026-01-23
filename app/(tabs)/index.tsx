import HabitGrid from '@/components/HabitGrid';
import { generateMockData } from '@/utils/mockData';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  // Generate data once
  const data = useMemo(() => generateMockData(365), []);

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="mb-6">
        <Text className="text-white text-2xl font-bold mb-2">My Habits</Text>
        <Text className="text-gray-400 text-base">Visualize your consistency.</Text>
      </View>

      <View className="bg-surface rounded-lg p-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white font-semibold">Activity Log</Text>
            <Text className="text-gray-500 text-xs">Last Year</Text>
        </View>
        <HabitGrid data={data} />
      </View>
      
      <View className="flex-row gap-2 mt-4">
         <Text className="text-gray-500 text-xs">Less</Text>
         <View className="flex-row gap-1">
            <View className="w-3 h-3 rounded-sm bg-habit-0" />
            <View className="w-3 h-3 rounded-sm bg-habit-1" />
            <View className="w-3 h-3 rounded-sm bg-habit-2" />
            <View className="w-3 h-3 rounded-sm bg-habit-3" />
            <View className="w-3 h-3 rounded-sm bg-habit-4" />
         </View>
         <Text className="text-gray-500 text-xs">More</Text>
      </View>
    </SafeAreaView>
  );
}
