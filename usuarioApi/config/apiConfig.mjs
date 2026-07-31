export function resolveApiBaseUrl({ platform = 'web', expoHostUri, configuredUrl }) {
  const normalizedConfiguredUrl = configuredUrl?.replace(/\/$/, '');

  if (normalizedConfiguredUrl) {
    return normalizedConfiguredUrl;
  }

  if (platform === 'web') {
    return 'http://localhost:5000';
  }

  if (platform === 'ios') {
    return 'http://192.168.1.58:5000';
  }

  const host = expoHostUri?.split(':')[0]?.trim();

  if (host) {
    return `http://${host}:5000`;
  }

  if (platform === 'android') {
    return 'http://10.0.2.2:5000';
  }

  return 'http://192.168.1.58:5000';
}
