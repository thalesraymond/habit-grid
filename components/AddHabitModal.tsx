import clsx from 'clsx';
import { Plus, Sparkles, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getHabitSuggestions } from '../services/gemini';
import { Habit, HabitSuggestion } from '../types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => void;
  onEdit?: (id: string, habit: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => void;
  habitToEdit?: Habit | null;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAdd, onEdit, habitToEdit }) => {
  const [title, setTitle] = useState('');
  const [targetPerWeek, setTargetPerWeek] = useState(7);
  const [color, setColor] = useState(COLORS[0]);
  const [aiGoal, setAiGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<HabitSuggestion[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (habitToEdit) {
        setTitle(habitToEdit.title);
        setTargetPerWeek(habitToEdit.targetPerWeek);
        setColor(habitToEdit.color);
      } else {
        resetForm();
      }
    }
  }, [isOpen, habitToEdit]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    
    if (habitToEdit && onEdit) {
      onEdit(habitToEdit.id, { title, targetPerWeek, color });
    } else {
      onAdd({ title, targetPerWeek, color });
    }
    handleClose();
  };

  const resetForm = () => {
    setTitle('');
    setTargetPerWeek(7);
    setColor(COLORS[0]);
    setSuggestions([]);
    setAiGoal('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleGenerate = async () => {
    if (!aiGoal.trim()) return;
    setIsGenerating(true);
    try {
        const results = await getHabitSuggestions(aiGoal);
        setSuggestions(results);
    } finally {
        setIsGenerating(false);
    }
  };

  const applySuggestion = (s: HabitSuggestion) => {
      setTitle(s.title);
      setTargetPerWeek(s.targetPerWeek);
      setColor(s.color);
  };

  return (
    <Modal visible={isOpen} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/40"
      >
        <View className="bg-white rounded-t-3xl h-[90%] overflow-hidden">
            <View className="flex-row justify-between items-center p-6 border-b border-gray-100">
              <Text className="text-xl font-bold text-gray-800">
                {habitToEdit ? 'Edit Habit' : 'New Habit'}
              </Text>
              <TouchableOpacity onPress={handleClose} className="p-2">
                <X size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 p-6" contentContainerStyle={{ paddingBottom: 100 }}>
                {/* AI Section */}
                {!habitToEdit && (
                  <View className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                      <View className="flex-row items-center gap-2 mb-2">
                          <Sparkles size={16} color="#4338ca" />
                          <Text className="text-indigo-700 font-medium text-sm">AI Habit Coach</Text>
                      </View>
                      <View className="flex-row gap-2 items-center">
                          <TextInput 
                              placeholder="e.g., Improve sleep quality"
                              className="flex-1 text-sm bg-white rounded-lg border border-gray-200 px-3 py-2 h-10"
                              value={aiGoal}
                              onChangeText={setAiGoal}
                          />
                          <TouchableOpacity 
                              onPress={handleGenerate}
                              disabled={isGenerating || !aiGoal}
                              className="bg-indigo-600 h-10 w-10 items-center justify-center rounded-lg"
                          >
                              {isGenerating ? <ActivityIndicator color="white" size="small" /> : <Sparkles size={18} color="white" />}
                          </TouchableOpacity>
                      </View>
                      {suggestions.length > 0 && (
                          <View className="mt-3 gap-2">
                              <Text className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Suggestions</Text>
                              {suggestions.map((s, i) => (
                                  <TouchableOpacity 
                                      key={i}
                                      onPress={() => applySuggestion(s)}
                                      className="bg-white p-3 rounded-lg border border-indigo-100 flex-row justify-between items-center"
                                  >
                                      <Text className="text-gray-700 font-medium">{s.title}</Text>
                                      <Plus size={14} color="#818cf8" />
                                  </TouchableOpacity>
                              ))}
                          </View>
                      )}
                  </View>
                )}

                {/* Manual Form */}
                <View className="gap-6">
                    <View>
                        <Text className="text-sm font-medium text-gray-700 mb-2">Habit Name</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="e.g. Read 10 pages"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 bg-gray-50 text-base"
                        />
                    </View>

                    <View>
                        <Text className="text-sm font-medium text-gray-700 mb-2">Frequency (per week)</Text>
                        <View className="flex-row justify-between bg-gray-50 p-1 rounded-xl">
                            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                <TouchableOpacity
                                    key={num}
                                    onPress={() => setTargetPerWeek(num)}
                                    className={clsx(
                                        "w-10 h-10 rounded-lg items-center justify-center",
                                        targetPerWeek === num ? "bg-white shadow-sm" : ""
                                    )}
                                >
                                    <Text className={clsx(
                                        "font-medium",
                                        targetPerWeek === num ? "text-blue-600" : "text-gray-400"
                                    )}>{num}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View>
                        <Text className="text-sm font-medium text-gray-700 mb-2">Theme Color</Text>
                        <View className="flex-row flex-wrap gap-3">
                            {COLORS.map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    onPress={() => setColor(c)}
                                    className={clsx(
                                        "w-8 h-8 rounded-full",
                                        color === c && "border-2 border-gray-400"
                                    )}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View className="p-6 border-t border-gray-100 bg-gray-50 pb-10">
                <TouchableOpacity
                    onPress={handleSubmit}
                    className="w-full bg-gray-900 py-3.5 rounded-xl items-center shadow-sm"
                >
                    <Text className="text-white font-medium text-base">
                        {habitToEdit ? 'Save Changes' : 'Create Habit'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
