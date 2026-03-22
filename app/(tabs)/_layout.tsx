import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  
  return (
    <View 
      className="absolute bottom-0 left-0 w-full z-50 bg-[#10141a]/90 border-t border-[#31353c]/15 flex-row justify-around items-center px-4"
      style={{ paddingBottom: Math.max(insets.bottom, 10), height: 64 + Math.max(insets.bottom, 0) }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = (name: string) => {
            switch(name) {
                case 'index': return 'grid-view';
                case 'stats': return 'leaderboard';
                case 'habit-detail': return 'analytics';
                case 'edit-habit': return 'settings-input-component';
                default: return 'circle';
            }
        };

        const getLabel = (name: string) => {
            switch(name) {
                case 'index': return 'DASHBOARD';
                case 'stats': return 'STATS';
                case 'habit-detail': return 'INSIGHTS';
                case 'edit-habit': return 'CONFIG';
                default: return name.toUpperCase();
            }
        };

        const color = isFocused ? '#4be260' : '#879484';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className={`flex-col items-center justify-center pt-2 pb-1 ${isFocused ? 'border-t-2 border-[#4be260]' : 'border-t-2 border-transparent'}`}
            style={{ minWidth: 64 }}
          >
            <MaterialIcons name={getIconName(route.name) as any} size={24} color={color} />
            <Text className="font-headline text-[10px] font-medium uppercase mt-1" style={{ color }}>
              {getLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs 
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="stats" />
      <Tabs.Screen name="habit-detail" />
      <Tabs.Screen name="edit-habit" />
    </Tabs>
  );
}
