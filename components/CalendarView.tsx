import { cssInterop } from 'nativewind';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { DayData } from '../utils/mockData';
import Square from './Square';

cssInterop(View, { className: 'style' });

interface CalendarViewProps {
    data: DayData[];
    color?: string;
}

export default function CalendarView({ data, color }: CalendarViewProps) {
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

    return (
        <View className="h-40">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-1">
                <View className="flex-row gap-1 p-2">
                    {weeks.map((week, wIndex) => (
                        <View key={wIndex} className="flex-col gap-1">
                            {week.map((day, dIndex) => (
                                <Square
                                    key={`${wIndex}-${dIndex}`}
                                    date={day.date}
                                    intensity={color ? undefined : day.intensity}
                                    color={color && day.intensity > 0 ? color : undefined}
                                    // standard size w-4 h-4 is default in Square
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
