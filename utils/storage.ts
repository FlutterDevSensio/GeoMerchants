// 📁 utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (username: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('username', username);
  } catch (e) {
    console.error('Error saving user:', e);
  }
};

export const getUser = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('username');
  } catch (e) {
    console.error('Error getting user:', e);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('username');
  } catch (e) {
    console.error('Error removing user:', e);
  }
};
