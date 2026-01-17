import { View } from 'react-native';
import './styles/global.css';
import {
  useFonts,
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
} from '@expo-google-fonts/host-grotesk';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { HomeHeader } from './components/HomeHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MealsList } from './components/MealsList';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    HostGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaProvider>
        <HomeHeader />
        <MealsList />
      </SafeAreaProvider>
    </View>
  );
}
