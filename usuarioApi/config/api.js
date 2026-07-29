import Constants from 'expo-constants';
import { Platform } from 'react-native';

const apiConfigurada = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
const hostExpo = Constants.expoConfig?.hostUri?.split(':')[0];

export const API_URL =
  apiConfigurada ??
  `http://${Platform.OS === 'web' ? 'localhost' : hostExpo}:5000`;

if (__DEV__) {
  console.log('URL de miAPI:', API_URL);
}
