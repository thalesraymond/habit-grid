import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useSegments, useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/ctx/AuthContext';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const inPublicGroup = segments[0] === 'login' || pathname === '/login';

    if (!user && !inPublicGroup) {
      // Use setTimeout to ensure navigation is ready and break render cycle if needed
      setTimeout(() => {
        router.replace('/login');
      }, 0);
    } else if (user && inPublicGroup) {
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 0);
    }
  }, [user, segments, isLoading, pathname]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
