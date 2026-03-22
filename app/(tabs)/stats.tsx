import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TopHeader, CommitGrid } from '@/components/PrototypeUI';

export default function StatsScreen() {
    const insets = useSafeAreaInsets();
    
    return (
        <View className="flex-1 bg-background pb-20">
            <TopHeader />
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                <View className="mb-12">
                    <View className="flex-row items-baseline gap-4 mb-2">
                        <Text className="font-headline text-3xl font-bold tracking-tight text-on-surface uppercase">System_Metrics</Text>
                        <View className="bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/20">
                            <Text className="font-label text-primary text-xs">LIVE_FEED</Text>
                        </View>
                    </View>
                    <Text className="text-outline font-body text-sm mt-2">
                        Aggregate performance data across all monitored behavioral protocols. Analyzing 30-day commit frequency and consistency vectors.
                    </Text>
                </View>

                {/* Global Commit History */}
                <View className="mb-8">
                    <View className="bg-surface-container rounded-lg p-6 relative overflow-hidden">
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center gap-2">
                                <MaterialIcons name="grid-view" size={16} color="#dfe2eb" />
                                <Text className="font-label text-sm font-bold text-on-surface uppercase">Global_Commit_History</Text>
                            </View>
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-[10px] font-label text-outline uppercase">Less</Text>
                                <View className="flex-row gap-1">
                                    <View className="w-3 h-3 bg-surface-container-highest rounded-sm" />
                                    <View className="w-3 h-3 bg-secondary-container/40 rounded-sm" />
                                    <View className="w-3 h-3 bg-secondary-container/70 rounded-sm" />
                                    <View className="w-3 h-3 bg-primary rounded-sm" />
                                </View>
                                <Text className="text-[10px] font-label text-outline uppercase">More</Text>
                            </View>
                        </View>
                        
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <CommitGrid cols={20} />
                        </ScrollView>

                        <View className="mt-6 flex-row flex-wrap gap-8 items-center border-t border-outline/10 pt-6">
                            <View className="flex-col">
                                <Text className="font-label text-[10px] text-outline uppercase tracking-wider">TOTAL_COMMITS</Text>
                                <Text className="font-headline text-2xl font-bold text-primary">1,284</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="font-label text-[10px] text-outline uppercase tracking-wider">CURRENT_STREAK</Text>
                                <Text className="font-headline text-2xl font-bold text-secondary">14_DAYS</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="font-label text-[10px] text-outline uppercase tracking-wider">COMPLETION_RATE</Text>
                                <Text className="font-headline text-2xl font-bold text-on-surface">92.4%</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Protocol Comparison & Focus Spread */}
                <View className="mb-8 flex-col gap-6">
                    <View className="bg-surface-container rounded-lg p-6 border border-outline/5">
                        <View className="flex-row justify-between items-start mb-8">
                            <View>
                                <Text className="font-label text-sm font-bold text-on-surface uppercase tracking-tight">Protocol_Comparison</Text>
                                <Text className="text-xs text-outline mt-1 font-body">Performance trends: Last 30 Days</Text>
                            </View>
                            <View className="flex-row gap-4">
                                <View className="flex-row items-center gap-2">
                                    <View className="w-2 h-2 rounded-full bg-primary" />
                                    <Text className="text-[10px] font-label text-outline uppercase">Active</Text>
                                </View>
                                <View className="flex-row items-center gap-2">
                                    <View className="w-2 h-2 rounded-full bg-outline/40" />
                                    <Text className="text-[10px] font-label text-outline uppercase">Target</Text>
                                </View>
                            </View>
                        </View>
                        
                        <View className="h-48 flex-row items-end justify-between gap-1">
                            {[20, 45, 30, 60, 85, 70, 95, 55, 40, 75].map((h, i) => (
                                <View key={i} className="flex-1 bg-surface-container-highest relative h-full justify-end">
                                    <View className="w-full bg-primary/40 absolute bottom-0" style={{height: `${h}%`}}></View>
                                    <View className="w-full bg-primary absolute bottom-0" style={{height: `${h * 0.4}%`}}></View>
                                </View>
                            ))}
                        </View>
                        
                        <View className="flex-row justify-between mt-4">
                            <Text className="text-[10px] font-label text-outline uppercase tracking-tighter">30_DAYS_AGO</Text>
                            <Text className="text-[10px] font-label text-outline uppercase tracking-tighter">15_DAYS_AGO</Text>
                            <Text className="text-[10px] font-label text-outline uppercase tracking-tighter">PRESENT</Text>
                        </View>
                    </View>

                    <View className="bg-surface-container rounded-lg p-6 border border-outline/5">
                        <Text className="font-label text-sm font-bold text-on-surface uppercase tracking-tight mb-4">Focus_Spread</Text>
                        <View className="flex-col gap-4">
                            {[
                                { label: 'Deep Work', val: 45 },
                                { label: 'Cardio Ops', val: 30 },
                                { label: 'Hydration', val: 25 }
                            ].map((item, i) => (
                                <View key={i} className="flex-col gap-1">
                                    <View className="flex-row justify-between">
                                        <Text className="text-[10px] font-label uppercase text-on-surface">{item.label}</Text>
                                        <Text className="text-[10px] font-label uppercase text-primary">{item.val}%</Text>
                                    </View>
                                    <View className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                                        <View className="h-full bg-primary" style={{width: `${item.val}%`}} />
                                    </View>
                                </View>
                            ))}
                        </View>
                        
                        <View className="pt-6 mt-6 border-t border-outline/10">
                            <TouchableOpacity className="w-full py-3 border border-primary/20 rounded items-center justify-center">
                                <Text className="font-label text-[10px] text-primary uppercase">Generate Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Neural Insights */}
                <View>
                    <View className="flex-row items-center gap-3 mb-6">
                        <MaterialIcons name="psychology" size={24} color="#4be260" />
                        <Text className="font-headline text-lg font-bold text-on-surface uppercase tracking-wide">Neural_Insights</Text>
                    </View>
                    
                    <View className="flex-col gap-4">
                        {[
                            { icon: 'trending-up', border: 'border-l-primary', color: 'text-primary', title: 'STREAK_PREDICTION', body: "Your 'Early Morning Run' streak is strong! Keep it up for 3 more days to set a new personal record.", meta: 'PROBABILITY: 88%' },
                            { icon: 'lightbulb', border: 'border-l-secondary', color: 'text-secondary', title: 'OPTIMIZATION_PROTOCOL', body: "Analysis suggests a performance dip in 'Hydration' during weekends. Initiating notifications at 10:00 UTC.", meta: 'CORRELATION: HIGH' },
                            { icon: 'schedule', border: 'border-l-tertiary', color: 'text-tertiary', title: 'PRIME_TIME_WINDOW', body: "You are most successful with 'Deep Work' when starting between 07:30 and 08:15.", meta: 'EFFICIENCY: +12%' },
                            { icon: 'warning', border: 'border-l-error', color: 'text-error', title: 'ANOMALY_DETECTED', body: "System detected a 2-day failure on 'Sleep Cycle'. Protocol risk increasing. Recommend 15m meditation.", meta: 'RISK_LEVEL: MED' }
                        ].map((insight, i) => (
                            <View key={i} className={`bg-surface-container-low p-6 rounded-lg border-l-4 ${insight.border} border-y border-r border-outline-variant/10`}>
                                <View className="flex-row gap-4">
                                    <View className="mt-1">
                                        <MaterialIcons name={insight.icon as any} size={24} color={insight.color.replace('text-', '') === 'primary' ? '#4be260' : insight.color.replace('text-', '') === 'secondary' ? '#66df72' : insight.color.replace('text-', '') === 'tertiary' ? '#7fda92' : '#ffb4ab'} />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-label text-sm font-bold text-on-surface mb-1">{insight.title}</Text>
                                        <Text className="text-sm font-body text-outline leading-relaxed">{insight.body}</Text>
                                        <View className="mt-4 flex-row items-center gap-4">
                                            <View className="bg-primary/5 px-2 py-0.5 border border-primary/10 rounded-sm">
                                                <Text className={`text-[10px] font-label ${insight.color}`}>{insight.meta}</Text>
                                            </View>
                                            <TouchableOpacity className="flex-row items-center gap-1">
                                                <Text className="text-[10px] font-label uppercase text-on-surface">View Data</Text>
                                                <MaterialIcons name="chevron-right" size={14} color="#dfe2eb" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
