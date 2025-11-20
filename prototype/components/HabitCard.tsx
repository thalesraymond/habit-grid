import React, { useCallback, useMemo } from 'react';
import { Habit } from '../types';
import { ContributionGraph } from './ContributionGraph';
import { Check, Trash2, Edit2, Flame, Trophy, BarChart3 } from 'lucide-react';

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
    const logDates = Object.keys(habit.logs).sort(); // sort ascending
    const total = logDates.length;
    
    // Streak Logic
    let maxStreak = 0;
    let currentStreak = 0;
    
    // Longest Streak Calculation
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

    // Current Streak Logic
    // We check backwards from Today (or Yesterday if Today isn't done yet)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Helper to check if a date string exists in logs
    const hasLog = (d: Date) => habit.logs[d.toISOString().split('T')[0]];
    
    let streakWalker = new Date(today);
    let streakCount = 0;

    // Check today
    if (hasLog(streakWalker)) {
        streakCount++;
    }

    // Walk backwards
    while (true) {
        streakWalker.setDate(streakWalker.getDate() - 1); // Go to previous day
        if (hasLog(streakWalker)) {
            streakCount++;
        } else {
            // If we haven't started counting (today wasn't done), and this is yesterday (gap of 0 effectively for user perception if they check in daily),
            // we need to know if the streak was broken yesterday.
            // Logic: If today is NOT checked, but Yesterday IS, streak = 1 (from yesterday) + others.
            // The loop handles this naturally: 
            // If today not checked -> count=0. Walker moves to Yesterday. 
            // If Yesterday checked -> count=1. Walker moves to DayBefore.
            break;
        }
    }
    currentStreak = streakCount;


    // Weekly Progress
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
             <h3 className="font-bold text-gray-800 text-lg">{habit.title}</h3>
             <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
               {habit.targetPerWeek}x / week
             </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{habit.description || "Consistency is key!"}</p>
        </div>
        
        <div className="flex items-center gap-1">
             <button 
                onClick={() => onEdit(habit.id)}
                className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                title="Edit Habit"
            >
                <Edit2 size={16} />
            </button>
            <button 
                onClick={() => onDelete(habit.id)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Delete Habit"
            >
                <Trash2 size={16} />
            </button>
            <div className="w-px h-6 bg-gray-100 mx-1"></div>
            <button
                onClick={handleCheck}
                className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 transform active:scale-90
                    ${isDoneToday ? 'text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-300 hover:bg-gray-200'}
                `}
                style={{ backgroundColor: isDoneToday ? habit.color : undefined }}
                title="Check In Today"
            >
                <Check size={20} strokeWidth={3} />
            </button>
        </div>
      </div>

      <div className="mb-6">
        <ContributionGraph logs={habit.logs} color={habit.color} />
      </div>

      <div className="grid grid-cols-4 gap-2 pt-4 border-t border-gray-50">
         {/* Current Streak */}
         <div className="flex flex-col items-center p-2 rounded-lg bg-orange-50/50 border border-orange-100/50">
            <div className="flex items-center gap-1 text-orange-600 mb-1">
                <Flame size={14} className={stats.currentStreak > 0 ? "fill-orange-500" : ""} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Streak</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{stats.currentStreak}</span>
         </div>

         {/* Longest Streak */}
         <div className="flex flex-col items-center p-2 rounded-lg bg-yellow-50/50 border border-yellow-100/50">
            <div className="flex items-center gap-1 text-yellow-600 mb-1">
                <Trophy size={14} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Best</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{stats.maxStreak}</span>
         </div>

         {/* Weekly Rate */}
         <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50/50 border border-blue-100/50">
            <div className="flex items-center gap-1 text-blue-600 mb-1">
                <BarChart3 size={14} />
                <span className="text-[10px] uppercase font-bold tracking-wider">Week</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{stats.weeklyProgress}%</span>
         </div>

         {/* Total */}
         <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-1 text-gray-500 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">Total</span>
            </div>
            <span className="text-lg font-bold text-gray-800">{stats.total}</span>
         </div>
      </div>
    </div>
  );
};