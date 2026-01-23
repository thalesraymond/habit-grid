import { cssInterop } from 'nativewind';
import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { DayData } from '../utils/mockData';
import Square from './Square';

cssInterop(View, { className: 'style' });
cssInterop(Text, { className: 'style' });

interface MonthlyCalendarProps {
    currentDate?: Date; // Month to display, defaults to today
    data: DayData[]; // Full history
    color?: string;
}

export default function MonthlyCalendar({ currentDate = new Date(), data, color }: MonthlyCalendarProps) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = useMemo(() => {
        const date = new Date(year, month, 1);
        const days: Date[] = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [year, month]);

    // Create a map for fast lookup
    const dataMap = useMemo(() => {
        const map = new Map<string, DayData>();
        data.forEach(d => map.set(d.date, d));
        return map;
    }, [data]);

    // Calendar grid logic
    // We need to pad the start of the month to align with day of week
    const firstDay = daysInMonth[0].getDay(); // 0 = Sunday
    // Create placeholders for empty slots
    const emptySlots = Array(firstDay).fill(null);

    const allSlots = [...emptySlots, ...daysInMonth];

    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    for (let i = 0; i < allSlots.length; i++) {
        currentWeek.push(allSlots[i]);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    if (currentWeek.length > 0) {
        // Pad the last week
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        weeks.push(currentWeek);
    }

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <View className="bg-surface rounded-lg p-4">
             <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white font-semibold text-lg">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </Text>
            </View>

            <View className="flex-row justify-between mb-2">
                {weekDays.map(day => (
                    <Text key={day} className="text-gray-500 text-xs w-8 text-center">{day}</Text>
                ))}
            </View>

            <View className="flex-col gap-2">
                {weeks.map((week, wIndex) => (
                    <View key={wIndex} className="flex-row justify-between">
                        {week.map((date, dIndex) => {
                            if (!date) {
                                return <View key={`empty-${wIndex}-${dIndex}`} className="w-8 h-8" />;
                            }

                            const dateStr = date.toISOString().split('T')[0];
                            const dayData = dataMap.get(dateStr);
                            const isFuture = date > new Date();

                            let status: 'completed' | 'missed' | 'pending' | undefined = undefined;

                            if (dayData) {
                                if (dayData.intensity > 0) status = 'completed';
                                else status = 'missed';
                            } else {
                                if (isFuture) status = 'pending';
                                else status = 'missed';
                            }

                            // For pending (future), we want a cleaner look
                            // For missed, we want gray
                            // For completed, we want color

                            return (
                                <View key={dateStr} className="w-8 h-8 items-center justify-center relative">
                                    <Square
                                        size={32}
                                        date={dateStr}
                                        status={!isFuture ? status : 'pending'}
                                        color={status === 'completed' ? color : undefined}
                                        className={isFuture ? 'opacity-20' : ''}
                                    />
                                    <Text className="absolute text-white text-xs font-medium opacity-80">
                                        {date.getDate()}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
}
