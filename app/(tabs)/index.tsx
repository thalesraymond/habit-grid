import CalendarView from '@/components/CalendarView';
import LineView, { LineViewData } from '@/components/LineView';
import { generateMockData } from '@/utils/mockData';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { cssInterop } from 'nativewind';
import { useMemo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

cssInterop(View, { className: 'style' });

export default function HomeScreen() {
  // Generate data once
  const data = useMemo(() => generateMockData(365), []);

  const getMockHistory = (seed: number): LineViewData[] => {
      // Generate last 5 days
      return Array.from({ length: 5 }).map((_, i) => ({
          date: `2023-01-${i + 1}`, // Dummy date
          status: ((seed + i) % 3 === 0 ? 'missed' : 'completed') as 'missed' | 'completed', // mostly completed
      })).reverse(); // Today is last? usually right is today.
      // If we want Left to Right: Past -> Today.
      // Array.from length 5. i=0 is 5 days ago usually?
      // Let's assume the view renders Left->Right.
      // "Today" should be on the right or user preference. Standard is Left=Past, Right=Today.
  };

  const habits = [
      { id: 1, title: 'Drink Water', color: 'bg-cyan-500', history: getMockHistory(1) },
      { id: 2, title: 'Morning Jog', color: 'bg-rose-500', history: getMockHistory(2) },
      { id: 3, title: 'Reading', color: 'bg-amber-500', history: getMockHistory(4) },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="mb-6 flex-row justify-between items-start">
            <View>
                <Text className="text-white text-2xl font-bold mb-2">My Habits</Text>
                <Text className="text-gray-400 text-base">Visualize your consistency.</Text>
            </View>
            <TouchableOpacity 
                onPress={() => Linking.openURL('https://github.com/thalesraymond/habit-grid')}
                className="p-2"
            >
                <Ionicons name="logo-github" size={24} color="#9CA3AF" />
            </TouchableOpacity>
        </View>

        {/* Global Activity Log */}
        <View className="bg-surface rounded-lg p-4 mb-8">
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white font-semibold">Activity Log</Text>
                <Text className="text-gray-500 text-xs">Last Year</Text>
            </View>
            <CalendarView data={data} />
            
            {/* Legend */}
            <View className="flex-row gap-2 mt-4 justify-end items-center">
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
        </View>

        {/* Individual Habits List */}
        <View className="gap-6">
            {habits.map(habit => (
                <View key={habit.id} className="bg-surface p-4 rounded-lg flex-row justify-between items-center">
                    <Text className="text-white font-medium text-lg">{habit.title}</Text>
                    <LineView data={habit.history} color={habit.color} />
                </View>
            ))}
            
            {/* Add Habit Button */}
            <TouchableOpacity 
                className="flex-row items-center justify-center p-4 rounded-lg border-2 border-dashed border-gray-700"
                activeOpacity={0.7}
            >
                <Text className="text-gray-400 font-medium text-lg">+ Add Habit</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
