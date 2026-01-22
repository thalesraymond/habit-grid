import React from 'react';
import { View, ScrollView } from 'react-native';
import { DayData } from '../utils/mockData';
import { cssInterop } from 'nativewind';

// Ensure View can accept className if not automatically handled by jsxImportSource
cssInterop(View, { className: 'style' });

interface HabitGridProps {
    data: DayData[];
}

export default function HabitGrid({ data }: HabitGridProps) {
    // Structure data into weeks (columns)
    // 7 days per week
    const weeks: DayData[][] = [];
    let currentWeek: DayData[] = [];

    data.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === data.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    const getIntensityClass = (intensity: number) => {
        switch (intensity) {
            case 1: return 'bg-habit-1';
            case 2: return 'bg-habit-2';
            case 3: return 'bg-habit-3';
            case 4: return 'bg-habit-4';
            default: return 'bg-habit-0'; // grid background or surface
        }
    };

    return (
        <View className="h-40">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
                <View className="flex-row gap-1 p-2">
                    {weeks.map((week, wIndex) => (
                        <View key={wIndex} className="flex-col gap-1">
                            {week.map((day, dIndex) => (
                                <View
                                    key={`${wIndex}-${dIndex}`}
                                    className={`w-4 h-4 rounded-sm ${getIntensityClass(day.intensity)}`}
                                    // Tooltip or accessibility label could go here
                                    accessibilityLabel={`Date: ${day.date}, Intensity: ${day.intensity}`}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
