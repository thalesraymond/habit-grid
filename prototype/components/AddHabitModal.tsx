import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Loader2 } from 'lucide-react';
import { Habit, HabitSuggestion } from '../types';
import { getHabitSuggestions } from '../services/gemini';

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            {habitToEdit ? 'Edit Habit' : 'New Habit'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
            {/* AI Section - Only show for new habits to keep edit clean, or keep it for inspiration? Let's hide for edit to focus on task. */}
            {!habitToEdit && (
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2 text-indigo-700 font-medium text-sm">
                      <Sparkles size={16} />
                      <span>AI Habit Coach</span>
                  </div>
                  <div className="flex gap-2">
                      <input 
                          type="text" 
                          placeholder="e.g., Improve sleep quality"
                          className="flex-1 text-sm rounded-lg border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                          value={aiGoal}
                          onChange={(e) => setAiGoal(e.target.value)}
                      />
                      <button 
                          onClick={handleGenerate}
                          disabled={isGenerating || !aiGoal}
                          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                      >
                          {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                      </button>
                  </div>
                  {suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                          <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide">Suggestions</p>
                          {suggestions.map((s, i) => (
                              <button 
                                  key={i}
                                  onClick={() => applySuggestion(s)}
                                  className="w-full text-left bg-white p-2 rounded-lg text-sm shadow-sm hover:bg-indigo-50 border border-indigo-100 flex justify-between items-center group"
                              >
                                  <span className="text-gray-700 font-medium">{s.title}</span>
                                  <Plus size={14} className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"/>
                              </button>
                          ))}
                      </div>
                  )}
              </div>
            )}

            {/* Manual Form */}
            <form id="habitForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Read 10 pages"
                        className="w-full rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 px-4 py-3 bg-gray-50 focus:bg-white transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Frequency (per week)</label>
                    <div className="flex justify-between bg-gray-50 p-1 rounded-xl">
                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setTargetPerWeek(num)}
                                className={`
                                    w-10 h-10 rounded-lg text-sm font-medium transition-all
                                    ${targetPerWeek === num ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-400 hover:text-gray-600'}
                                `}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme Color</label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => setColor(c)}
                                className={`
                                    w-8 h-8 rounded-full transition-transform hover:scale-110
                                    ${color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}
                                `}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>
            </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
            <button
                type="submit"
                form="habitForm"
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-medium hover:bg-black transition-colors shadow-lg shadow-gray-200"
            >
                {habitToEdit ? 'Save Changes' : 'Create Habit'}
            </button>
        </div>
      </div>
    </div>
  );
};