import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TopHeader, CommitGrid } from '@/components/PrototypeUI';
import { cssInterop } from 'nativewind';
import React, { useState } from 'react';

cssInterop(View, { className: 'style' });

export default function DashboardScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    
    const [tasks, setTasks] = useState([
        { title: 'Deep Work Session', sub: 'Completed at 09:14 AM', checked: true },
        { title: 'Daily Hydration', sub: 'Completed at 11:30 AM', checked: true },
        { title: 'Read Documentation', sub: 'Pending Task', checked: false },
        { title: 'Cardio Routine', sub: 'Scheduled for 06:00 PM', checked: false },
    ]);

    const toggleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].checked = !newTasks[index].checked;
        setTasks(newTasks);
    };

    return (
        <View className="flex-1 bg-background pb-20">
            <TopHeader />
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                {/* Total Contributions Section */}
                <View className="bg-surface-container p-6 rounded-lg border border-outline-variant/10 mb-8 overflow-hidden">
                    <View className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundColor: 'rgba(189, 202, 184, 0.05)' }}></View>
                    <View className="flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <View>
                            <Text className="font-headline text-2xl font-bold text-on-surface mb-1 uppercase">Total_Contributions</Text>
                            <View className="flex-row items-baseline gap-2">
                                <Text className="font-label text-4xl font-bold text-primary">1,284</Text>
                                <Text className="font-label text-sm text-secondary">++12% VS LAST_PERIOD</Text>
                            </View>
                        </View>
                        <View className="flex-row gap-2 items-center">
                            <Text className="text-[10px] font-label text-on-surface-variant uppercase">Less</Text>
                            <View className="w-3 h-3 bg-surface-container-highest rounded-sm"></View>
                            <View className="w-3 h-3 bg-secondary-container/40 rounded-sm"></View>
                            <View className="w-3 h-3 bg-secondary-container/70 rounded-sm"></View>
                            <View className="w-3 h-3 bg-primary rounded-sm"></View>
                            <Text className="text-[10px] font-label text-on-surface-variant uppercase">More</Text>
                        </View>
                    </View>
                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
                        <View>
                            <CommitGrid cols={20} />
                            <View className="flex-row justify-between mt-3 px-1 w-full">
                                <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Jan</Text>
                                <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Feb</Text>
                                <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Mar</Text>
                                <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">Apr</Text>
                                <Text className="font-label text-[10px] text-on-surface-variant uppercase tracking-wider">May</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Active Streaks */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4 px-1">
                        <Text className="font-headline text-lg font-bold uppercase tracking-tight text-on-surface">Active_Streaks</Text>
                        <TouchableOpacity onPress={() => router.push('/stats')}>
                            <Text className="font-label text-xs text-primary">VIEW_METRICS</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View className="flex-col gap-4">
                        {[
                            { name: 'Morning Dev', title: 'Deep Work Session', val: 42, perc: 84, lvl: 8, color: 'text-primary' },
                            { name: 'Health Loop', title: 'Daily Hydration', val: 118, perc: 95, lvl: 12, color: 'text-secondary' },
                            { name: 'Skill Tree', title: 'Read Documentation', val: 14, perc: 40, lvl: 3, color: 'text-tertiary' }
                        ].map((streak, i) => (
                            <TouchableOpacity 
                                key={i} 
                                className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10 active:opacity-70"
                                onPress={() => router.push('/habit-detail')}
                            >
                                <View className="flex-row justify-between items-start mb-4">
                                    <View>
                                        <Text className="font-label text-[10px] text-on-surface-variant uppercase mb-1">{streak.name}</Text>
                                        <Text className="font-body font-bold text-on-surface text-base">{streak.title}</Text>
                                    </View>
                                    <Text className={`font-label text-2xl font-bold ${streak.color}`}>{streak.val}</Text>
                                </View>
                                <View className="flex-col gap-2">
                                    <View className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden flex-row">
                                        <View className="h-full bg-primary" style={{width: `${streak.perc}%`}}></View>
                                    </View>
                                    <View className="flex-row justify-between">
                                        <Text className="font-label text-[10px] text-on-surface-variant">LVL 0{streak.lvl}</Text>
                                        <Text className="font-label text-[10px] text-on-surface-variant">{streak.perc}% TO NEXT_MILESTONE</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Today Deployment */}
                <View className="mb-8">
                    <View className="flex-row items-center justify-between mb-4 px-1">
                        <Text className="font-headline text-lg font-bold uppercase tracking-tight text-on-surface">Today_Deployment</Text>
                        <Text className="font-label text-xs text-on-surface-variant">04 / 06 COMPLETED</Text>
                    </View>
                    
                    <View className="flex-col gap-3">
                        {tasks.map((item, i) => (
                            <View key={i} className="flex-row items-center justify-between bg-surface-container p-4 rounded border border-outline-variant/10">
                                <TouchableOpacity 
                                    className="flex-row items-center gap-4 flex-1"
                                    onPress={() => toggleTask(i)}
                                    activeOpacity={0.7}
                                >
                                    <View className={`w-6 h-6 border-2 rounded-sm flex items-center justify-center ${item.checked ? 'bg-primary border-primary' : 'border-outline bg-transparent'}`}>
                                        {item.checked && <MaterialIcons name="check" size={16} color="#00390c" />}
                                    </View>
                                    <View>
                                        <Text className={`font-body font-medium ${item.checked ? 'text-on-surface-variant line-through' : 'text-on-surface'}`}>{item.title}</Text>
                                        <Text className={`font-label text-[11px] uppercase ${item.checked ? 'text-primary' : 'text-on-surface-variant'}`}>{item.sub}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    
                    <TouchableOpacity 
                        onPress={() => router.push('/edit-habit')} 
                        className="w-full mt-6 py-4 border-2 border-dashed border-outline-variant/30 rounded flex-row items-center justify-center gap-2 active:opacity-70"
                    >
                        <MaterialIcons name="add-circle" size={20} color="#879484" />
                        <Text className="font-headline font-bold uppercase tracking-widest text-sm text-on-surface-variant">Initialize_New_Habit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
