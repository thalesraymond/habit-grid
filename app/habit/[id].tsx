import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cssInterop } from 'nativewind';
import CalendarView from '@/components/CalendarView';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import { getHabitHistory, getHabitStats } from '@/utils/mockData';
import Ionicons from '@expo/vector-icons/Ionicons';

cssInterop(View, { className: 'style' });
cssInterop(Text, { className: 'style' });
cssInterop(TouchableOpacity, { className: 'style' });

export default function HabitDetailScreen() {
    const { id, title, color } = useLocalSearchParams<{ id: string, title: string, color: string }>();

    // Mock data based on ID
    const history = useMemo(() => getHabitHistory(180), []);
    const stats = useMemo(() => getHabitStats(id || '1'), [id]);

    const habitColor = color || 'bg-cyan-500'; // Default fallback

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
            <Stack.Screen options={{
                headerShown: true,
                title: title || 'Habit Details',
                headerStyle: { backgroundColor: '#0d1117' }, // match bg-background
                headerTintColor: '#fff',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
            }} />

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* Hero Section */}
                <View className="items-center mb-8 pt-4">
                    <Text className="text-white text-3xl font-bold mb-2">{title || 'Unknown Habit'}</Text>
                    <View className="flex-row items-center gap-2 mb-6">
                        <Ionicons name="flame" size={24} color="#F97316" />
                        <Text className="text-gray-400 text-xl">{stats.currentStreak} Day Streak!</Text>
                    </View>

                    <TouchableOpacity
                        className={`px-8 py-4 rounded-full ${habitColor} items-center justify-center shadow-lg w-full`}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-lg">Mark Complete</Text>
                    </TouchableOpacity>
                </View>

                {/* Consistency Heatmap */}
                <View className="mb-8">
                    <Text className="text-white text-xl font-semibold mb-4">Consistency</Text>
                    <View className="bg-surface rounded-lg p-4">
                         <CalendarView data={history} color={habitColor} />
                    </View>
                </View>

                {/* Statistics */}
                <View className="mb-8">
                    <Text className="text-white text-xl font-semibold mb-4">Statistics</Text>
                    <View className="flex-row gap-4">
                        <View className="flex-1 bg-surface p-4 rounded-lg items-center">
                            <Text className="text-gray-400 text-xs uppercase font-bold mb-1">Best</Text>
                            <Text className="text-white text-2xl font-bold">{stats.bestStreak}</Text>
                        </View>
                         <View className="flex-1 bg-surface p-4 rounded-lg items-center">
                            <Text className="text-gray-400 text-xs uppercase font-bold mb-1">Rate</Text>
                            <Text className="text-white text-2xl font-bold">{stats.completionRate}%</Text>
                        </View>
                        <View className="flex-1 bg-surface p-4 rounded-lg items-center">
                            <Text className="text-gray-400 text-xs uppercase font-bold mb-1">Total</Text>
                            <Text className="text-white text-2xl font-bold">{stats.totalCompleted}</Text>
                        </View>
                    </View>
                </View>

                {/* History */}
                <View className="mb-8">
                    <Text className="text-white text-xl font-semibold mb-4">History</Text>
                    <MonthlyCalendar data={history} color={habitColor} />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
