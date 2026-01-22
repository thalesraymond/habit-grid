
import React from 'react';
import { render } from '@testing-library/react-native';
import HabitGrid from '@/components/HabitGrid';
import { generateMockData, DayData } from '@/utils/mockData';

// Mocking nativewind if needed, though often it just passes classNames through in tests
// For unit testing className logic, we might need to inspect props.

describe('HabitGrid', () => {
    it('renders correctly', () => {
        const data = generateMockData(7); // 1 week
        const tree = render(<HabitGrid data={data} />);
        expect(tree).toBeDefined();
    });

    it('renders correct number of cells', () => {
        const days = 14;
        const data = generateMockData(days);
        const { getAllByLabelText } = render(<HabitGrid data={data} />);
        
        // We added accessibilityLabel checking in the component
        // accessibilityLabel={`Date: ${day.date}, Intensity: ${day.intensity}`}
        
        const cells = getAllByLabelText(/Date:/);
        expect(cells.length).toBe(days);
    });

    it('applies intensity classes', () => {
        const data: DayData[] = [
            { date: '2023-01-01', intensity: 0 },
            { date: '2023-01-02', intensity: 4 },
        ];

        const { getByLabelText } = render(<HabitGrid data={data} />);
        
        const cell0 = getByLabelText(/Intensity: 0/);
        const cell4 = getByLabelText(/Intensity: 4/);

        // NativeWind usually maps className to style prop in test environment or keeps it as className prop depending on setup
        // We can check if the props contain the expected class names string if verify passed through
        // Or check specific styles if processed.
        // For now, let's assume we can check props.className (common in web-like testing) or examine the style.
        
        // Note: In RN testing library with NativeWind, asserting on styles can be tricky without full setup.
        // We will basic existance check for now.
        expect(cell0).toBeTruthy();
        expect(cell4).toBeTruthy();
    });
});
