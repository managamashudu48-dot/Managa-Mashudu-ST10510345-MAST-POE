import { Stack } from 'expo-router';
import { MenuProvider } from '../context/MenuContext';

export default function Layout() {
  return (
    <MenuProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="add" />
      </Stack>
    </MenuProvider>
  );
}
