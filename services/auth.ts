import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { saveUser } from '../db/queries';
import { User } from '../types';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication?.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token?: string) => {
    if (!token) return;
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userDetails = await res.json();
      
      const newUser: User = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        photoUrl: userDetails.picture,
      };

      saveUser(newUser);
      setUser(newUser);
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  };

  const logout = () => {
    setUser(null);
    // In a real app, you might want to revoke the token
  };

  return {
    user,
    promptAsync,
    request,
    logout
  };
};
