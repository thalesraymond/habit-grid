import clsx from 'clsx';
import { BarChart3, Check, Edit2, Flame, Trash2, Trophy } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Habit } from '../types';
import { ContributionGraph } from './ContributionGraph';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string, date: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete, onEdit }) => {
  const todayKey = new Date().toISOString().split('T')[0];
  const isDoneToday = !!habit.logs[todayKey];

  const handleCheck = useCallback(() => {
    onToggle(habit.id, todayKey);
  }, [habit.id, onToggle, todayKey]);

  const stats = useMemo(() => {
    const logDates = Object.keys(habit.logs).sort();
    const total = logDates.length;
    
    let maxStreak = 0;
    let tempRun = 0;
    let prevDate: Date | null = null;

    for (const dStr of logDates) {
        const d = new Date(dStr);
        if (prevDate) {
            const diffTime = d.getTime() - prevDate.getTime();
            const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
            if (diffDays === 1) {
                tempRun++;
            } else {
                tempRun = 1;
            }
        } else {
            tempRun = 1;
        }
        if (tempRun > maxStreak) maxStreak = tempRun;
        prevDate = d;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const hasLog = (d: Date) => habit.logs[d.toISOString().split('T')[0]];
    
    let streakWalker = new Date(today);
    let streakCount = 0;

    if (hasLog(streakWalker)) {
        streakCount++;
    }

    while (true) {
        streakWalker.setDate(streakWalker.getDate() - 1);
        if (hasLog(streakWalker)) {
            streakCount++;
        } else {
            break;
        }
    }
    const currentStreak = streakCount;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    let weeklyCount = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(d.getDate() + i);
      if (habit.logs[d.toISOString().split('T')[0]]) weeklyCount++;
    }
    
    const weeklyProgress = Math.round((weeklyCount / habit.targetPerWeek) * 100);

    return {
        total,
        maxStreak,
        currentStreak,
        weeklyCount,
        weeklyProgress: weeklyProgress > 100 ? 100 : weeklyProgress
    };
  }, [habit.logs, habit.targetPerWeek]);

  return (
    <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 mr-4">
          <View className="flex-row items-center gap-2 mb-1">
             <Text className="font-bold text-gray-800 text-lg">{habit.title}</Text>
             <View className="px-2 py-0.5 rounded-full bg-gray-100">
               <Text className="text-[10px] text-gray-500 font-medium">
                 {habit.targetPerWeek}x / week
               </Text>
             </View>
          </View>
          <Text className="text-xs text-gray-500">{habit.description || "Consistency is key!"}</Text>
        </View>
        
        <View className="flex-row items-center gap-1">
             <TouchableOpacity 
                onPress={() => onEdit(habit.id)}
                className="p-2 rounded-full bg-gray-50"
            >
                <Edit2 size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => onDelete(habit.id)}
                className="p-2 rounded-full bg-gray-50 ml-1"
            >
                <Trash2 size={16} color="#9CA3AF" />
            </TouchableOpacity>
            <View className="w-px h-6 bg-gray-100 mx-1" />
            <TouchableOpacity
                onPress={handleCheck}
                className={clsx(
                    "w-10 h-10 rounded-full items-center justify-center",
                    isDoneToday ? "shadow-sm" : "bg-gray-100"
                )}
                style={{ backgroundColor: isDoneToday ? habit.color : undefined }}
            >
                <Check size={20} strokeWidth={3} color={isDoneToday ? "white" : "#D1D5DB"} />
            </TouchableOpacity>
        </View>
      </View>

      <View className="mb-6">
        <ContributionGraph logs={habit.logs} color={habit.color} />
      </View>

      <View className="flex-row justify-between pt-4 border-t border-gray-50">
         {/* Current Streak */}
         <View className="flex-1 items-center p-2 rounded-lg bg-orange-50 border border-orange-100 mx-1">
            <View className="flex-row items-center gap-1 mb-1">
                <Flame size={14} color="#EA580C" fill={stats.currentStreak > 0 ? "#F97316" : "none"} />
                <Text className="text-[10px] uppercase font-bold tracking-wider text-orange-600">Streak</Text>
            </View>
            <Text className="text-lg font-bold text-gray-800">{stats.currentStreak}</Text>
         </View>

         {/* Longest Streak */}
         <View className="flex-1 items-center p-2 rounded-lg bg-yellow-50 border border-yellow-100 mx-1">
            <View className="flex-row items-center gap-1 mb-1">
                <Trophy size={14} color="#CA8A04" />
                <Text className="text-[10px] uppercase font-bold tracking-wider text-yellow-600">Best</Text>
            </View>
            <Text className="text-lg font-bold text-gray-800">{stats.maxStreak}</Text>
         </View>

         {/* Weekly Rate */}
         <View className="flex-1 items-center p-2 rounded-lg bg-blue-50 border border-blue-100 mx-1">
            <View className="flex-row items-center gap-1 mb-1">
                <BarChart3 size={14} color="#2563EB" />
                <Text className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Week</Text>
            </View>
            <Text className="text-lg font-bold text-gray-800">{stats.weeklyProgress}%</Text>
         </View>

         {/* Total */}
         <View className="flex-1 items-center p-2 rounded-lg bg-gray-50 border border-gray-100 mx-1">
            <View className="flex-row items-center gap-1 mb-1">
                <Text className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Total</Text>
            </View>
            <Text className="text-lg font-bold text-gray-800">{stats.total}</Text>
         </View>
      </View>
    </View>
  );
};
