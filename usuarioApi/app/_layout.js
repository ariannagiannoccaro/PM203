
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="usuarios/[id]"
        options={{ title: 'Detalle de usuario' }}
      />
      <Stack.Screen
        name="usuarios/editar/[id]"
        options={{ title: 'Editar usuario' }}
      />
    </Stack>
  );
}
