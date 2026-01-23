import { View, Text, ActivityIndicator } from 'react-native';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { useAuth } from '../ctx/AuthContext';

export default function LoginScreen() {
  const { signIn, isLoading } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <View className="w-full max-w-sm space-y-8">
        <View className="items-center">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="mt-2 text-gray-600">Sign in to continue</Text>
        </View>

        <View className="mt-8">
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <GoogleSignInButton onPress={signIn} />
          )}
        </View>
      </View>
    </View>
  );
}
