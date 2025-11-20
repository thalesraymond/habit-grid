import { useRouter } from 'expo-router';
import { LayoutGrid } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { db, initDb } from '../db';
import { useGoogleAuth } from '../services/auth';

export default function LoginScreen() {
  const { user, promptAsync } = useGoogleAuth();
  const router = useRouter();

  useEffect(() => {
    initDb();
    // Check if user is already logged in DB (simple persistence check)
    // In a real app, we'd check a secure store token, but here we check if we have a user in DB
    // Actually, useGoogleAuth handles the session. But if we want to persist login across restarts without re-prompting:
    // We need to store the user ID in AsyncStorage or similar.
    // For this prototype, we'll rely on the Auth Session flow or just check if there is ANY user in DB for auto-login demo.
    const checkLogin = () => {
        const users = db.getAllSync('SELECT * FROM users LIMIT 1') as any[];
        if (users.length > 0) {
            router.replace('/dashboard');
        }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  return (
    <View className="flex-1 bg-white items-center justify-center px-4">
      <View className="absolute top-0 left-0 w-full h-64 bg-blue-50 opacity-50" />
      
      <View className="w-full max-w-sm items-center space-y-8">
          <View className="bg-blue-600 p-4 rounded-2xl shadow-xl transform rotate-3 mb-6">
              <LayoutGrid color="white" size={40} />
          </View>
          
          <View className="items-center mb-8">
              <Text className="text-3xl font-bold text-gray-900 mb-2">HabitGrid</Text>
              <Text className="text-gray-500 text-center">Visualize your consistency. Master your habits.</Text>
          </View>

          <View className="bg-gray-50 p-8 rounded-2xl border border-gray-100 w-full">
               <TouchableOpacity 
                  onPress={() => promptAsync()}
                  className="w-full flex-row items-center justify-center gap-3 bg-white border border-gray-200 py-3 px-4 rounded-xl shadow-sm"
               >
                  {/* Simple Google Icon placeholder or use an image asset if available. Using text for now or a colored View */}
                  <View className="w-5 h-5 rounded-full bg-red-500 items-center justify-center">
                      <Text className="text-white text-xs font-bold">G</Text>
                  </View>
                  <Text className="text-gray-700 font-medium">Continue with Google</Text>
               </TouchableOpacity>
               <Text className="mt-4 text-xs text-gray-400 text-center">
                  By continuing, you agree to our prototype terms.
               </Text>
          </View>
      </View>
    </View>
  );
}
