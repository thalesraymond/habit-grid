
export interface DayData {
    date: string;
    intensity: 0 | 1 | 2 | 3 | 4;
}

export const generateMockData = (days: number = 365): DayData[] => {
    const data: DayData[] = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (days - 1 - i));
        
        // Random intensity weighted towards lower numbers for realism
        const rand = Math.random();
        let intensity: 0 | 1 | 2 | 3 | 4 = 0;
        
        if (rand > 0.8) intensity = 3;
        else if (rand > 0.6) intensity = 2;
        else if (rand > 0.3) intensity = 1;
        else if (rand > 0.9) intensity = 4; // Rare max day
        
        data.push({
            date: date.toISOString().split('T')[0],
            intensity
        });
    }
    
    return data;
};

export interface HabitStat {
    currentStreak: number;
    bestStreak: number;
    completionRate: number; // percentage
    totalCompleted: number;
}

export const getHabitStats = (id: string | number): HabitStat => {
    // Deterministic mock based on ID
    const seed = Number(id) || 1;
    return {
        currentStreak: (seed * 3) % 15 + 2,
        bestStreak: (seed * 5) % 30 + 10,
        completionRate: 75 + (seed % 20),
        totalCompleted: 100 + (seed * 10)
    };
};

export const getHabitHistory = (days: number = 180): DayData[] => {
    const data: DayData[] = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (days - 1 - i));

        // Simpler intensity for specific habits: 0 (missed) or 4 (done)
        // With some random variation
        const rand = Math.random();
        let intensity: 0 | 1 | 2 | 3 | 4 = 0;

        if (rand > 0.3) intensity = 4; // Mostly done

        data.push({
            date: date.toISOString().split('T')[0],
            intensity
        });
    }

    return data;
};
