
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
