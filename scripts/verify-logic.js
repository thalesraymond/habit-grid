
// Mock LineViewData interface
// status: 'completed' | 'pending' | 'missed';

const getMockHistory = (seed) => {
  return Array.from({ length: 5 }).map((_, i) => ({
      date: `2023-01-${i + 1}`,
      status: ((seed + i) % 3 === 0 ? 'missed' : 'completed'),
  })).reverse();
};

const habits = [
    { id: 1, title: 'Drink Water', color: 'bg-cyan-500', history: getMockHistory(1) },
    { id: 2, title: 'Morning Jog', color: 'bg-rose-500', history: getMockHistory(2) },
    { id: 3, title: 'Reading', color: 'bg-amber-500', history: getMockHistory(4) },
];

console.log('Verifying habits data structure...');
habits.forEach(habit => {
    console.log(`Habit: ${habit.title}, Color: ${habit.color}`);
    console.log(`History length: ${habit.history.length}`);
    habit.history.forEach(day => {
        if (!day.date || !day.status) {
            console.error('Invalid day data:', day);
            process.exit(1);
        }
    });
});

console.log('Verification successful!');
