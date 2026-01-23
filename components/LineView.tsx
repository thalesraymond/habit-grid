import { cssInterop } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import Square from './Square';

cssInterop(View, { className: 'style' });

export interface LineViewData {
    date: string;
    status: 'completed' | 'pending' | 'missed';
    // or we could use intensity
}

interface LineViewProps {
    data: LineViewData[];
    color: string; // Tailwind bg color class, e.g. "bg-cyan-500"
}

export default function LineView({ data, color }: LineViewProps) {
    return (
        <View className="flex-row gap-2">
            {data.map((day, index) => (
                <Square
                    key={index}
                    date={day.date}
                    status={day.status}
                    color={day.status === 'completed' ? color : undefined} // Only apply color if completed
                    className={day.status === 'pending' ? 'bg-surface border border-gray-700' : ''} // Optional styling for pending
                    size={40} 
                />
            ))}
        </View>
    );
}
