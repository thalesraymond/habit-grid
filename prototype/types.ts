export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
}

export interface Habit {
  id: string;
  title: string;
  description?: string;
  targetPerWeek: number; // 1-7
  color: string; // Hex
  createdAt: string; // ISO Date
  logs: Record<string, boolean>; // "YYYY-MM-DD": true
}

export interface HabitSuggestion {
  title: string;
  description: string;
  targetPerWeek: number;
  color: string;
}
