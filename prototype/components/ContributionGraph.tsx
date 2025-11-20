import React, { useMemo } from 'react';

interface ContributionGraphProps {
  logs: Record<string, boolean>;
  color: string;
}

// Helper to get date string YYYY-MM-DD
const toDateKey = (date: Date) => date.toISOString().split('T')[0];

export const ContributionGraph: React.FC<ContributionGraphProps> = ({ logs, color }) => {
  // Generate the last ~16 weeks (approx 4 months) of dates for a compact mobile-friendly view
  // OR 52 weeks for desktop. Let's do a responsive calculation or fixed period.
  // For this prototype, we'll do the last 126 days (18 weeks) to fit nicely.
  
  const weeks = useMemo(() => {
    const today = new Date();
    const daysToRender = 18 * 7; // 18 weeks
    const grid: Date[][] = [];
    
    // Calculate start date to align with Sunday
    const endDate = new Date(today);
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - daysToRender);
    
    // Adjust start date to the previous Sunday to align grid
    const dayOfWeek = startDate.getDay(); 
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let currentWeek: Date[] = [];
    const iterator = new Date(startDate);

    // We generate slightly more to fill the grid rectangles
    for (let i = 0; i < daysToRender + 14; i++) {
      if (currentWeek.length === 7) {
        grid.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(iterator));
      iterator.setDate(iterator.getDate() + 1);
    }
    if (currentWeek.length > 0) grid.push(currentWeek);

    return grid;
  }, []);

  return (
    <div className="flex flex-col gap-1 overflow-x-auto no-scrollbar pb-2">
      <div className="flex gap-[2px]">
        {weeks.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-[2px]">
            {week.map((day, dIndex) => {
              const dateKey = toDateKey(day);
              const isChecked = !!logs[dateKey];
              const isToday = dateKey === toDateKey(new Date());
              
              return (
                <div
                  key={dateKey}
                  title={`${dateKey}${isChecked ? ' - Done!' : ''}`}
                  style={{
                    backgroundColor: isChecked ? color : '#e2e8f0', // gray-200 for empty
                  }}
                  className={`
                    w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[1px] transition-all duration-300
                    ${isToday ? 'ring-1 ring-offset-1 ring-gray-400' : ''}
                    hover:opacity-80
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 px-1">
        <span>{weeks[0]?.[0]?.toLocaleString('default', { month: 'short' })}</span>
        <span>Today</span>
      </div>
    </div>
  );
};
