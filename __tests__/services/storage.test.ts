import * as SecureStore from 'expo-secure-store';
import { saveItem, getItem, deleteItem } from '../../services/storage';
import { Platform } from 'react-native';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('Storage Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Native', () => {
    beforeAll(() => {
      // @ts-ignore
      Platform.OS = 'ios';
    });

    it('should save item using SecureStore', async () => {
      await saveItem('key', 'value');
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('key', 'value');
    });

    it('should get item using SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('value');
      const result = await getItem('key');
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('key');
      expect(result).toBe('value');
    });

    it('should delete item using SecureStore', async () => {
      await deleteItem('key');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('key');
    });
  });

  describe('Web', () => {
    let originalLocalStorage: Storage;
    let store: Record<string, string> = {};

    beforeAll(() => {
      // @ts-ignore
      Platform.OS = 'web';

      // Mock localStorage
      store = {};
      const localStorageMock = {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          store[key] = value.toString();
        }),
        removeItem: jest.fn((key: string) => {
          delete store[key];
        }),
        clear: jest.fn(() => {
           store = {};
        }),
        length: 0,
        key: jest.fn(),
      } as unknown as Storage;

      originalLocalStorage = global.localStorage;
      Object.defineProperty(global, 'localStorage', {
        value: localStorageMock,
        writable: true
      });
    });

    afterAll(() => {
      Object.defineProperty(global, 'localStorage', {
        value: originalLocalStorage,
        writable: true
      });
    });

    it('should save item using localStorage', async () => {
      await saveItem('key', 'value');
      expect(localStorage.setItem).toHaveBeenCalledWith('key', 'value');
    });

    it('should get item using localStorage', async () => {
      await getItem('key');
      expect(localStorage.getItem).toHaveBeenCalledWith('key');
    });

    it('should delete item using localStorage', async () => {
      await deleteItem('key');
      expect(localStorage.removeItem).toHaveBeenCalledWith('key');
    });
  });
});
