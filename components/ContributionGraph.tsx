import clsx from 'clsx';
import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface ContributionGraphProps {
  logs: Record<string, boolean>;
  color: string;
}

const toDateKey = (date: Date) => date.toISOString().split('T')[0];

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ logs, color }) => {
  const weeks = useMemo(() => {
    const today = new Date();
    const daysToRender = 18 * 7; // 18 weeks
    const grid: Date[][] = [];
    
    const endDate = new Date(today);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - daysToRender);
    
    const dayOfWeek = startDate.getDay(); 
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let currentWeek: Date[] = [];
    const iterator = new Date(startDate);

    for (let i = 0; i < daysToRender + 14; i++) {
      if (currentWeek.length === 7) {
        grid.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(iterator));
      iterator.setDate(iterator.getDate() + 1);
    }
    if (currentWeek.length > 0) grid.push(currentWeek);

    return grid;
  }, []);

  return (
    <View className="flex-col gap-1">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
        <View className="flex-row gap-[2px]">
          {weeks.map((week, wIndex) => (
            <View key={wIndex} className="flex-col gap-[2px]">
              {week.map((day, dIndex) => {
                const dateKey = toDateKey(day);
                const isChecked = !!logs[dateKey];
                const isToday = dateKey === toDateKey(new Date());
                
                return (
                  <View
                    key={dateKey}
                    style={{
                      backgroundColor: isChecked ? color : '#e2e8f0',
                    }}
                    className={clsx(
                      "w-2.5 h-2.5 rounded-[1px]",
                      isToday && "border border-gray-400"
                    )}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-row justify-between px-1">
        <Text className="text-[10px] text-gray-400">
            {weeks[0]?.[0]?.toLocaleString('default', { month: 'short' })}
        </Text>
        <Text className="text-[10px] text-gray-400">Today</Text>
      </View>
    </View>
  );
};
