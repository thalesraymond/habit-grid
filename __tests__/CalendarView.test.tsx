import CalendarView from '@/components/CalendarView';
import { generateMockData } from '@/utils/mockData';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('CalendarView', () => {
    it('renders correctly', () => {
        const data = generateMockData(7); // 1 week
        const tree = render(<CalendarView data={data} />);
        expect(tree).toBeDefined();
    });

    it('renders correct number of cells', () => {
        const days = 14;
        const data = generateMockData(days);
        const { getAllByLabelText } = render(<CalendarView data={data} />);
        
        const cells = getAllByLabelText(/Date:/);
        expect(cells.length).toBe(days);
    });
});
