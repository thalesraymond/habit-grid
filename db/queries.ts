import { Habit, User } from '../types';
import { db } from './index';

// User Queries
export const getUser = (id: string): User | null => {
  const row = db.getFirstSync('SELECT * FROM users WHERE id = ?', [id]) as User | null;
  return row;
};

export const saveUser = (user: User) => {
  db.runSync(
    'INSERT OR REPLACE INTO users (id, name, email, photoUrl) VALUES (?, ?, ?, ?)',
    [user.id, user.name, user.email, user.photoUrl]
  );
};

// Habit Queries
export const getHabits = (): Habit[] => {
  const habits = db.getAllSync('SELECT * FROM habits ORDER BY createdAt DESC') as any[];
  
  return habits.map(h => {
    const logs = db.getAllSync('SELECT date FROM habit_logs WHERE habitId = ?', [h.id]) as { date: string }[];
    const logMap: Record<string, boolean> = {};
    logs.forEach(l => logMap[l.date] = true);
    
    return {
      ...h,
      logs: logMap
    };
  });
};

export const addHabit = (habit: Habit) => {
  db.runSync(
    'INSERT INTO habits (id, title, description, targetPerWeek, color, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
    [habit.id, habit.title, habit.description || '', habit.targetPerWeek, habit.color, habit.createdAt]
  );
};

export const updateHabit = (id: string, data: Partial<Habit>) => {
    // Dynamic update query building would be better, but for now simple updates
    if (data.title) db.runSync('UPDATE habits SET title = ? WHERE id = ?', [data.title, id]);
    if (data.description !== undefined) db.runSync('UPDATE habits SET description = ? WHERE id = ?', [data.description, id]);
    if (data.targetPerWeek) db.runSync('UPDATE habits SET targetPerWeek = ? WHERE id = ?', [data.targetPerWeek, id]);
    if (data.color) db.runSync('UPDATE habits SET color = ? WHERE id = ?', [data.color, id]);
};

export const deleteHabit = (id: string) => {
  db.runSync('DELETE FROM habits WHERE id = ?', [id]);
};

export const toggleHabitLog = (habitId: string, date: string) => {
  const exists = db.getFirstSync('SELECT 1 FROM habit_logs WHERE habitId = ? AND date = ?', [habitId, date]);
  
  if (exists) {
    db.runSync('DELETE FROM habit_logs WHERE habitId = ? AND date = ?', [habitId, date]);
  } else {
    db.runSync('INSERT INTO habit_logs (habitId, date) VALUES (?, ?)', [habitId, date]);
  }
};
