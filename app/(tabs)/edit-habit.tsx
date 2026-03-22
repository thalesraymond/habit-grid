import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { TopHeader } from '@/components/PrototypeUI';

export default function EditHabitScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-background pb-20">
            <TopHeader />
            <ScrollView className="flex-1" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
                <View className="mb-8 flex-row items-center gap-2">
                    <Text className="font-label text-xs tracking-widest text-primary-fixed-dim">~/habits</Text>
                    <Text className="font-label text-xs text-on-surface-variant">/</Text>
                    <Text className="font-label text-xs text-on-surface uppercase">new_instance.sh</Text>
                </View>

                <View className="bg-surface-container rounded-lg overflow-hidden border border-outline-variant/15 flex-row">
                    <View className="w-12 pt-6 items-end pr-4 border-r border-outline-variant/15">
                        {[...Array(16)].map((_, i) => (
                            <Text key={i} className="font-label text-xs text-outline-variant leading-[40px]">
                                {String(i + 1).padStart(2, '0')}
                            </Text>
                        ))}
                    </View>
                    
                    <View className="flex-1 p-6 flex-col gap-10">
                        <View className="flex-col gap-2">
                            <View className="flex-row items-center">
                                <Text className="font-label text-xs uppercase tracking-widest text-secondary opacity-70">const </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim">habit_name </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-secondary opacity-70">= </Text>
                            </View>
                            <TextInput 
                                className="w-full bg-surface-container-lowest border border-transparent focus:border-primary/40 text-on-surface font-label text-xl p-4 rounded-md"
                                placeholder="'Morning Meditation'"
                                placeholderTextColor="rgba(135, 148, 132, 0.3)"
                            />
                        </View>

                        <View className="flex-col gap-2">
                            <View className="flex-row items-center">
                                <Text className="font-label text-xs uppercase tracking-widest text-secondary opacity-70">function </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim">describe() {"{"}</Text>
                            </View>
                            <View className="pl-4 border-l-2 border-outline-variant/20">
                                <TextInput 
                                    className="w-full bg-surface-container-lowest border border-transparent focus:border-primary/40 text-on-surface font-body text-sm p-4 rounded-md"
                                    placeholder="Define the core objective of this ritual..."
                                    placeholderTextColor="rgba(135, 148, 132, 0.3)"
                                    multiline
                                    numberOfLines={3}
                                    style={{ textAlignVertical: 'top', minHeight: 80 }}
                                />
                            </View>
                            <Text className="font-label text-xs text-secondary opacity-70">{"}"}</Text>
                        </View>

                        <View className="flex-col gap-4">
                            <View className="flex-row flex-wrap items-center">
                                <Text className="font-label text-xs uppercase tracking-widest text-secondary opacity-70">import </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim">{"{ frequency }"} </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-secondary opacity-70">from </Text>
                                <Text className="font-label text-xs uppercase tracking-widest text-tertiary-fixed-dim">'schedule'</Text>
                            </View>
                            
                            <View className="flex-col md:flex-row gap-4">
                                {['Daily', 'Specific Days', 'Weekly'].map((type, i) => (
                                    <TouchableOpacity 
                                        key={i} 
                                        className={`p-4 border rounded-md flex-1 ${i === 1 ? 'bg-primary/10 border-primary/40' : 'bg-surface-container-lowest border-outline-variant/30'}`}
                                    >
                                        <Text className={`font-label text-xs mb-1 ${i === 1 ? 'text-primary-fixed-dim' : 'text-outline'}`}>TYPE</Text>
                                        <Text className={`font-medium ${i === 1 ? 'text-primary' : 'text-on-surface'}`}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            
                            <View className="flex-row flex-wrap gap-2 pt-2">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <TouchableOpacity 
                                        key={i} 
                                        className={`w-10 h-10 items-center justify-center rounded-sm ${[0, 2, 4].includes(i) ? 'bg-primary' : 'bg-surface-container-highest'}`}
                                    >
                                        <Text className={`font-label text-xs font-bold ${[0, 2, 4].includes(i) ? 'text-on-primary' : 'text-outline'}`}>{day}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-12 flex-col items-center justify-end gap-6">
                    <TouchableOpacity onPress={() => router.push('/')} className="px-6 py-3 w-full items-center">
                        <Text className="font-label text-xs uppercase tracking-[0.2em] text-outline">[ Abort_Process ]</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/')} className="w-full bg-primary py-4 rounded-md items-center shadow-lg">
                        <Text className="text-on-primary font-label font-bold uppercase tracking-widest text-base">Commit Habit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
