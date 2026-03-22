import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

cssInterop(View, { className: 'style' });

export const TopHeader = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    return (
        <View className="bg-[#10141a] border-b border-[#31353c]/15 z-40" style={{ paddingTop: insets.top }}>
            <View className="flex-row justify-between items-center w-full px-6 h-16">
                <TouchableOpacity className="flex-row items-center gap-3" onPress={() => router.push('/')}>
                    <MaterialIcons name="terminal" size={24} color="#4be260" />
                    <Text className="font-headline uppercase tracking-widest text-xl font-bold text-[#4be260]">TERMINAL_HABIT</Text>
                </TouchableOpacity>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity className="p-2 text-[#879484] hover:bg-[#31353c]/50 transition-colors rounded-full">
                        <MaterialIcons name="search" size={24} color="#879484" />
                    </TouchableOpacity>
                    <View className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline/20">
                        <Image source={{uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl3diFM414vOviLOKtZIMEULCHiETy46fL2bsU5jXHI2KWI8LKvBeTLeGeU5Vt99LtcsEZlceSsQvzqOrAc0mC9v3NQtnEiq4YwMMynBMpEARDxms9JXg--BcVN97bDNPLVGviTnGtUvFEN8q78K5UKKrjlRHHMYHL0DWNqbLgFJWPCHRme-FYvXokxD46VgIJuM9dIXEu4HvG1cu9EpIOrCxPq_9-cCkiMRkzvVRL1XIaaI36uQrFFwE1B9-yw_e-_sosaxkJTQ"}} style={{width: 32, height: 32}} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export const CommitCell = ({ intensity }: { intensity: number }) => {
    const colors = ['bg-surface-container-highest', 'bg-secondary-container/40', 'bg-secondary-container/70', 'bg-primary'];
    const colorClass = colors[intensity] || colors[0];
    return <View className={`w-3 h-3 rounded-sm ${colorClass}`} />;
};

export const CommitGrid = ({ cols = 26 }: { cols?: number }) => {
    return (
        <View className="flex-row gap-[3px] overflow-hidden pb-4">
            {[...Array(cols)].map((_, i) => (
                <View key={i} className="flex-col gap-[3px]">
                    {[...Array(7)].map((_, j) => (
                        <CommitCell key={j} intensity={Math.floor(Math.random() * 4)} />
                    ))}
                </View>
            ))}
        </View>
    );
};
