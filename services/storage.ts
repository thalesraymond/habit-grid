import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Saves an item to secure storage.
 * On web, it falls back to localStorage (not secure).
 * @param key The key to store the value under
 * @param value The value to store
 */
export async function saveItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Local storage is not available:', e);
    }
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

/**
 * Retrieves an item from secure storage.
 * On web, it retrieves from localStorage.
 * @param key The key to retrieve
 * @returns The value or null if not found
 */
export async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    } catch (e) {
      console.error('Local storage is not available:', e);
      return null;
    }
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

/**
 * Deletes an item from secure storage.
 * On web, it removes from localStorage.
 * @param key The key to delete
 */
export async function deleteItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.error('Local storage is not available:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
