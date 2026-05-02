import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';

const STATS_DATA = [
    { label: 'Current Streak', val: '14', unit: 'DAYS', color: 'text-primary' },
    { label: 'Longest Streak', val: '42', unit: 'DAYS', color: 'text-on-surface' },
    { label: 'Total Commits', val: '892', unit: '', color: 'text-on-surface' },
    { label: 'Completion Rate', val: '94', unit: '%', color: 'text-secondary' }
];

const RECENT_ACTIVITY_DATA = [
    { date: 'Oct 24, 2023', meta: '09:42 PM • 4 COMMITS', status: 'success' },
    { date: 'Oct 23, 2023', meta: '10:15 PM • 1 COMMIT', status: 'success' },
    { date: 'Oct 22, 2023', meta: 'NO ACTIVITY RECORDED', status: 'missed' },
    { date: 'Oct 21, 2023', meta: '11:58 PM • 12 COMMITS', status: 'success' },
];

export default function HabitDetailScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const contributionData = useMemo(() => {
        return [...Array(10)].map(() =>
            [...Array(7)].map(() => {
                const r = Math.random();
                return r > 0.8 ? 'bg-primary' : r > 0.6 ? 'bg-secondary-container' : 'bg-surface-container-highest';
            })
        );
    }, []);
    
    return (
        <View className="flex-1 bg-background pb-20">
            <View className="flex-row items-center bg-surface p-4 justify-between border-b border-outline-variant/20 z-50" style={{ paddingTop: insets.top + 16 }}>
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-high">
                    <MaterialIcons name="arrow-back" size={24} color="#dfe2eb" />
                </TouchableOpacity>
                <Text className="text-on-surface text-lg font-headline font-bold uppercase tracking-widest flex-1 px-4">Daily_Coding</Text>
                <TouchableOpacity onPress={() => router.push('/edit-habit')} className="w-10 h-10 items-center justify-center rounded-lg bg-surface-container-high border border-outline-variant/30">
                    <MaterialIcons name="edit" size={20} color="#dfe2eb" />
                </TouchableOpacity>
            </View>
            
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Yearly Contribution */}
                <View className="p-4 mt-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-on-surface text-sm font-label font-bold uppercase tracking-widest">Yearly Contribution</Text>
                        <Text className="text-primary text-xs font-label">342 Commits / 2024</Text>
                    </View>
                    <View className="bg-surface-container-low p-6 rounded border border-outline-variant/10 relative overflow-hidden">
                        <View className="flex-col gap-1">
                            <View className="w-full flex-row gap-[2px] h-24">
                                {contributionData.map((week, i) => (
                                    <View key={i} className="flex-1 flex-col gap-[2px]">
                                        {week.map((color, j) => (
                                            <View key={j} className={`w-full flex-1 rounded-sm ${color}`} />
                                        ))}
                                    </View>
                                ))}
                                <View className="flex-[10] bg-surface-container-highest/20 rounded-sm items-center justify-center px-4">
                                    <Text className="text-[10px] text-outline font-label uppercase text-center">
                                        Visualizing 12 Months High-Frequency Activity
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row justify-between mt-2">
                                <Text className="text-[10px] text-outline font-label uppercase">Jan</Text>
                                <Text className="text-[10px] text-outline font-label uppercase">Mar</Text>
                                <Text className="text-[10px] text-outline font-label uppercase">Jun</Text>
                                <Text className="text-[10px] text-outline font-label uppercase">Sep</Text>
                                <Text className="text-[10px] text-outline font-label uppercase">Dec</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View className="p-4 flex-row flex-wrap gap-3">
                    {STATS_DATA.map((stat, i) => (
                        <View key={i} className="w-[48%] bg-surface-container p-4 rounded border border-outline-variant/10">
                            <Text className="text-on-surface-variant text-[10px] font-label uppercase tracking-wider mb-1">{stat.label}</Text>
                            <View className="flex-row items-baseline gap-1">
                                <Text className={`${stat.color} text-3xl font-label font-bold`}>{stat.val}</Text>
                                <Text className="text-on-surface-variant text-xs font-label uppercase">{stat.unit}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Weekly Goal Progress */}
                <View className="px-4 py-2">
                    <View className="bg-surface-container-lowest p-4 rounded border border-primary/20">
                        <View className="flex-row justify-between items-end mb-2">
                            <Text className="text-on-surface text-xs font-label uppercase tracking-widest">Weekly Goal Progress</Text>
                            <Text className="text-primary font-label text-sm">6 / 7</Text>
                        </View>
                        <View className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex-row">
                            <View className="h-full bg-primary" style={{width: '85%'}} />
                        </View>
                    </View>
                </View>

                {/* Recent Activity */}
                <View className="p-4">
                    <Text className="text-on-surface text-sm font-label font-bold uppercase tracking-widest mb-4">Recent_Activity</Text>
                    <View className="flex-col gap-2">
                        {RECENT_ACTIVITY_DATA.map((log, i) => (
                            <View key={i} className={`flex-row items-center justify-between p-3 bg-surface-container-low rounded border-l-2 ${log.status === 'success' ? 'border-l-primary' : 'border-l-outline-variant/30'}`}>
                                <View className={`flex-col ${log.status === 'missed' ? 'opacity-50' : ''}`}>
                                    <Text className="text-on-surface text-sm font-label uppercase">{log.date}</Text>
                                    <Text className="text-on-surface-variant text-[10px] font-label uppercase">{log.meta}</Text>
                                </View>
                                <MaterialIcons 
                                    name={log.status === 'success' ? 'check-circle' : 'radio-button-unchecked'} 
                                    size={20} 
                                    color={log.status === 'success' ? '#4be260' : '#3e4a3c'} 
                                />
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity className="w-full mt-4 py-3 border border-outline-variant/30 rounded items-center">
                        <Text className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">Load Archive Logs</Text>
                    </TouchableOpacity>
                </View>

                {/* Danger Zone */}
                <View className="p-4 mt-8">
                    <View className="p-4 border border-error/20 rounded bg-error-container/5">
                        <Text className="text-error text-[10px] font-label font-bold uppercase tracking-widest mb-4">Danger Zone</Text>
                        <TouchableOpacity className="flex-row items-center justify-center gap-2 w-full py-3 rounded border border-error/30">
                            <MaterialIcons name="delete" size={16} color="#ffb4ab" />
                            <Text className="text-error text-sm font-label uppercase tracking-wider">Terminate Habit Thread</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View className="absolute bottom-24 right-6">
                <TouchableOpacity onPress={() => router.push('/edit-habit')} className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <MaterialIcons name="add" size={32} color="#00390c" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
