import { cssInterop } from 'nativewind';
import React from 'react';
import { Pressable, View } from 'react-native';

cssInterop(Pressable, { className: 'style' });
cssInterop(View, { className: 'style' });

interface SquareProps {
  date?: string;
  intensity?: number; // 0-4
  status?: 'completed' | 'pending' | 'missed';
  color?: string; // Tailwind color class base (e.g., 'bg-cyan-500'), overrides intensity logic if simple status
  size?: number; // default 16 (w-4)
  onPress?: () => void;
  className?: string;
}

export default function Square({
  date,
  intensity,
  status,
  color,
  size, // We'll handle size via style to avoid dynamic class issues
  onPress,
  className = '',
}: SquareProps) {
  // Determine background color
  let bgClass = 'bg-habit-0';

  if (intensity !== undefined) {
    switch (intensity) {
      case 1: bgClass = 'bg-habit-1'; break;
      case 2: bgClass = 'bg-habit-2'; break;
      case 3: bgClass = 'bg-habit-3'; break;
      case 4: bgClass = 'bg-habit-4'; break;
      default: bgClass = 'bg-habit-0';
    }
  } else if (status) {
    // If status is provided, we might use the color prop or defaults
    if (status === 'completed') {
       bgClass = color || 'bg-habit-4';
    } else if (status === 'missed') {
       bgClass = 'bg-gray-700';
    } else {
       bgClass = 'bg-habit-0';
    }
  } else if (color) {
      bgClass = color;
  }

  // Size logic: Use inline style for specific pixel sizes, default to w-4 h-4 class if no size provided
  const hasCustomSize = size !== undefined;
  const baseClass = `rounded-sm ${bgClass} ${className}`;
  const finalClass = hasCustomSize ? baseClass : `w-4 h-4 ${baseClass}`;
  const customStyle = hasCustomSize ? { width: size, height: size } : undefined;

  if (onPress) {
    return (
      <Pressable 
        className={finalClass} 
        style={customStyle}
        onPress={onPress} 
        accessibilityLabel={`Date: ${date}, Status: ${status || intensity}`}
      />
    );
  }

  return (
    <View 
      className={finalClass}
      style={customStyle}
      accessibilityLabel={`Date: ${date}, Status: ${status || intensity}`} 
    />
  );
}
