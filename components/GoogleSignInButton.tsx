import { TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface GoogleSignInButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export function GoogleSignInButton({ onPress, disabled }: GoogleSignInButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm ${
        disabled ? 'opacity-50' : 'active:bg-gray-100'
      }`}
    >
      <View className="mr-3">
        <AntDesign name="google" size={20} color="black" />
      </View>
      <Text className="text-gray-700 font-medium text-base">
        Sign in with Google
      </Text>
    </TouchableOpacity>
  );
}
