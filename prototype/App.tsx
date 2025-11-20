import React, { useState, useEffect } from 'react';
import { User, Habit } from './types';
import { HabitCard } from './components/HabitCard';
import { AddHabitModal } from './components/AddHabitModal';
import { Plus, LogOut, LayoutGrid, Search } from 'lucide-react';

// Mock user for Google Login simulation
const MOCK_USER: User = {
  id: 'google_123',
  name: 'Alex Developer',
  email: 'alex@example.com',
  photoUrl: 'https://ui-avatars.com/api/?name=Alex+Developer&background=0D8ABC&color=fff&rounded=true'
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('habit_user');
    const storedHabits = localStorage.getItem('habit_data');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedHabits) setHabits(JSON.parse(storedHabits));
    
    setIsLoading(false);
  }, []);

  // Persist data whenever it changes
  useEffect(() => {
    if (!isLoading) {
        localStorage.setItem('habit_data', JSON.stringify(habits));
    }
  }, [habits, isLoading]);

  const handleLogin = () => {
    // Simulate Google Login delay
    setIsLoading(true);
    setTimeout(() => {
        setUser(MOCK_USER);
        localStorage.setItem('habit_user', JSON.stringify(MOCK_USER));
        setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('habit_user');
  };

  const addHabit = (data: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => {
    const newHabit: Habit = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString(),
        logs: {}
    };
    setHabits(prev => [newHabit, ...prev]);
    setIsModalOpen(false);
  };

  const editHabit = (id: string, data: Omit<Habit, 'id' | 'logs' | 'createdAt'>) => {
    setHabits(prev => prev.map(h => 
        h.id === id ? { ...h, ...data } : h
    ));
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  const deleteHabit = (id: string) => {
    if (confirm('Are you sure you want to delete this habit?')) {
        setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  const toggleHabit = (id: string, date: string) => {
    setHabits(prev => prev.map(h => {
        if (h.id !== id) return h;
        const newLogs = { ...h.logs };
        if (newLogs[date]) {
            delete newLogs[date];
        } else {
            newLogs[date] = true;
        }
        return { ...h, logs: newLogs };
    }));
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

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
          </div>
      )
  }

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent -z-10"></div>
        
        <div className="w-full max-w-md space-y-8 text-center">
            <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-200 transform rotate-3">
                    <LayoutGrid className="text-white w-10 h-10" />
                </div>
            </div>
            
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">HabitGrid</h1>
                <p className="text-gray-500">Visualize your consistency. Master your habits.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                 <button 
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow-md group"
                 >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span>Continue with Google</span>
                 </button>
                 <p className="mt-4 text-xs text-gray-400">
                    By continuing, you agree to our prototype terms.
                 </p>
            </div>
        </div>
      </div>
    );
  }

  // Main App Dashboard
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <LayoutGrid className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight hidden sm:inline-block">HabitGrid</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-gray-50 pl-1 pr-3 py-1 rounded-full border border-gray-100">
                        <img src={user.photoUrl} alt={user.name} className="w-7 h-7 rounded-full" />
                        <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate hidden sm:block">{user.name}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Your Habits</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        You have {habits.length} active habits. Keep the streaks alive!
                    </p>
                </div>
                <button 
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl hover:bg-black transition-colors shadow-lg shadow-gray-200 font-medium text-sm"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">New Habit</span>
                    <span className="sm:hidden">Add</span>
                </button>
            </div>

            {habits.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No habits yet</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mb-6">Start building your better self today. Add your first habit to see the grid light up.</p>
                    <button 
                        onClick={openAddModal}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Create your first habit
                    </button>
                </div>
            ) : (
                <div className="grid gap-4">
                    {habits.map(habit => (
                        <HabitCard 
                            key={habit.id} 
                            habit={habit} 
                            onToggle={toggleHabit}
                            onDelete={deleteHabit}
                            onEdit={openEditModal}
                        />
                    ))}
                </div>
            )}
        </main>

        <AddHabitModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onAdd={addHabit}
            onEdit={editHabit}
            habitToEdit={editingHabit}
        />
    </div>
  );
};

export default App;