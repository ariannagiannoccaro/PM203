import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { resolveApiBaseUrl } from './apiConfig.mjs';

const apiConfigurada = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
const hostExpo = Constants.expoConfig?.hostUri?.split(':')[0];

export const API_URL = resolveApiBaseUrl({
  platform: Platform.OS,
  expoHostUri: hostExpo,
  configuredUrl: apiConfigurada,
});

if (__DEV__) {
  console.log('URL de miAPI:', API_URL);
}
