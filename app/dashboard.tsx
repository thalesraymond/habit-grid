import { useFocusEffect } from '@expo/router';
import { useRouter } from 'expo-router';
import { LayoutGrid, LogOut, Plus, Search } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AddHabitModal } from '../components/AddHabitModal';
import { HabitCard } from '../components/HabitCard';
import { db } from '../db';
import { addHabit, deleteHabit, getHabits, toggleHabitLog, updateHabit } from '../db/queries';
import { Habit, User } from '../types';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(() => {
    // Load User (Just pick the first one for now as we don't have auth context passing ID yet)
    const users = db.getAllSync('SELECT * FROM users LIMIT 1') as User[];
    if (users.length > 0) {
        setUser(users[0]);
    } else {
        router.replace('/');
        return;
    }

    // Load Habits
    const loadedHabits = getHabits();
    setHabits(loadedHabits);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleLogout = () => {
    // In real app, clear session. Here we just navigate back.
    // To really logout, we might want to clear the user from DB or just clear the "session" state.
    // For now, just go back to login.
    router.replace('/');
  };

  const handleAddHabit = (data: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => {
    const newHabit: Habit = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
        logs: {}
    };
    addHabit(newHabit);
    loadData();
    setIsModalOpen(false);
  };

  const handleEditHabit = (id: string, data: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => {
    updateHabit(id, data);
    loadData();
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    // Alert.alert('Delete Habit', 'Are you sure?', [
    //   { text: 'Cancel', style: 'cancel' },
    //   { text: 'Delete', style: 'destructive', onPress: () => { deleteHabit(id); loadData(); } }
    // ]);
    // For prototype speed, just delete
    deleteHabit(id);
    loadData();
  };

  const handleToggleHabit = (id: string, date: string) => {
    toggleHabitLog(id, date);
    loadData();
  };

  const openAddModal = () => {
      setEditingHabit(null);
      setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
      const habit = habits.find(h => h.id === id);
      if (habit) {
          setEditingHabit(habit);
          setIsModalOpen(true);
      }
  };

  if (!user) return null;

  return (
    <View className="flex-1 bg-[#F8FAFC]">
        {/* Header */}
        <View className="bg-white border-b border-gray-100 pt-12 pb-4 px-4 flex-row items-center justify-between shadow-sm z-10">
            <View className="flex-row items-center gap-2">
                <View className="bg-blue-600 p-1.5 rounded-lg">
                    <LayoutGrid color="white" size={20} />
                </View>
                <Text className="font-bold text-gray-900 text-lg">HabitGrid</Text>
            </View>

            <View className="flex-row items-center gap-4">
                <View className="flex-row items-center gap-2 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-100">
                    {user.photoUrl ? (
                        <Image source={{ uri: user.photoUrl }} className="w-7 h-7 rounded-full" />
                    ) : (
                        <View className="w-7 h-7 rounded-full bg-gray-300" />
                    )}
                    <Text className="text-sm font-medium text-gray-700 max-w-[100px]" numberOfLines={1}>{user.name}</Text>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <LogOut size={20} color="#9CA3AF" />
                </TouchableOpacity>
            </View>
        </View>

        {/* Content */}
        <ScrollView 
            className="flex-1 px-4 py-6"
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View className="flex-row justify-between items-end mb-6">
                <View>
                    <Text className="text-2xl font-bold text-gray-900">Your Habits</Text>
                    <Text className="text-gray-500 text-sm mt-1">
                        You have {habits.length} active habits.
                    </Text>
                </View>
                <TouchableOpacity 
                    onPress={openAddModal}
                    className="flex-row items-center gap-2 bg-gray-900 px-4 py-2.5 rounded-xl shadow-sm"
                >
                    <Plus size={18} color="white" />
                    <Text className="text-white font-medium text-sm">New Habit</Text>
                </TouchableOpacity>
            </View>

            {habits.length === 0 ? (
                <View className="items-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <View className="w-16 h-16 bg-blue-50 rounded-full items-center justify-center mb-4">
                        <Search size={24} color="#3b82f6" />
                    </View>
                    <Text className="text-lg font-semibold text-gray-900 mb-1">No habits yet</Text>
                    <Text className="text-gray-500 text-center max-w-xs mb-6 px-4">Start building your better self today. Add your first habit to see the grid light up.</Text>
                    <TouchableOpacity onPress={openAddModal}>
                        <Text className="text-blue-600 font-medium">Create your first habit</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="gap-4 pb-10">
                    {habits.map(habit => (
                        <HabitCard 
                            key={habit.id} 
                            habit={habit} 
                            onToggle={handleToggleHabit}
                            onDelete={handleDeleteHabit}
                            onEdit={openEditModal}
                        />
                    ))}
                </View>
            )}
        </ScrollView>

        <AddHabitModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAdd={handleAddHabit}
            onEdit={handleEditHabit}
            habitToEdit={editingHabit}
        />
    </View>
  );
}
