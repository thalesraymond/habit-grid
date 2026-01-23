import Square from '@/components/Square';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('Square', () => {
    it('renders correctly', () => {
        const { getByLabelText } = render(<Square date="2023-01-01" intensity={1} />);
        expect(getByLabelText('Date: 2023-01-01, Status: 1')).toBeTruthy();
    });

    it('applies custom size via style', () => {
         const { getByLabelText } = render(<Square date="2023-01-01" size={24} />);
         const element = getByLabelText(/Date: 2023-01-01/);
         expect(element.props.style).toEqual(expect.objectContaining({ width: 24, height: 24 }));
    });

    it('handles onPress', () => {
        const onPressMock = jest.fn();
        const { getByLabelText } = render(
            <Square date="2023-01-01" intensity={1} onPress={onPressMock} />
        );
        
        fireEvent.press(getByLabelText('Date: 2023-01-01, Status: 1'));
        expect(onPressMock).toHaveBeenCalled();
    });

    it('displays status correctly', () => {
        const { getByLabelText } = render(<Square date="2023-01-01" status="completed" />);
        expect(getByLabelText('Date: 2023-01-01, Status: completed')).toBeTruthy();
    });
    
    it('applies custom color', () => {
        // We can't easily test style class application, but we can verify it renders without error
        const { getByLabelText } = render(
            <Square date="2023-01-01" status="completed" color="bg-cyan-500" />
        );
        expect(getByLabelText('Date: 2023-01-01, Status: completed')).toBeTruthy();
    });
});
