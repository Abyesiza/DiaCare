import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { MenuProvider } from 'react-native-popup-menu';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MenuProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="appointScreen" options={{ presentation: 'modal', title:"Appointment Reminders"}} />
        <Stack.Screen name="medicate" options={{ presentation: 'modal', title:"Medication Reminders"}} />
        <Stack.Screen name="glucoseScreen" options={{ presentation: 'modal' , title:"Glucose level Tracker"}} />
        <Stack.Screen name="bpScreen" options={{ presentation: 'modal', title:"Blood pressure Tracker" }} />
        <Stack.Screen name="lsScreen" options={{ presentation: 'modal' , title:"Recomendations"}} />
        <Stack.Screen name="signin" options={{ presentation: 'modal' , title:"SignIn"}} />
        <Stack.Screen name="signup" options={{ presentation: 'modal' , title:"SignUp"}} />
        <Stack.Screen name='form' options={{presentation:'modal', title:'form'}} />
        <Stack.Screen name='chatRoom' options={{presentation:'modal', title:'inbox'}} />
        <Stack.Screen name='foodScreen' options={{presentation:'modal', title:'Health Foods'}} />
      </Stack>
      </MenuProvider>
    </ThemeProvider>
  );
}
