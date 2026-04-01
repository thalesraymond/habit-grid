import { createContext, useContext, useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { saveItem, getItem, deleteItem } from '../services/storage';

WebBrowser.maybeCompleteAuthSession();

type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
  token?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    // Placeholder client IDs - typically these should be in env vars
    iosClientId: 'GOOGLE_IOS_CLIENT_ID',
    androidClientId: 'GOOGLE_ANDROID_CLIENT_ID',
    webClientId: 'GOOGLE_WEB_CLIENT_ID',
  });

  useEffect(() => {
    checkLocalUser();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      }
    }
  }, [response]);

  const checkLocalUser = async () => {
    setIsLoading(true);
    try {
      const userJson = await getItem('auth.user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async (token: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      const userData = { ...user, token };
      setUser(userData);
      await saveItem('auth.user', JSON.stringify(userData));
      await saveItem('auth.token', token);
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    await promptAsync();
  };

  const signOut = async () => {
    setUser(null);
    await deleteItem('auth.user');
    await deleteItem('auth.token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
