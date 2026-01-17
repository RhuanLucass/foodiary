import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
import { DateSwitcher } from './components/DateSwitcher';
import { DailyStats } from './components/DailyStats';

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
        <DateSwitcher />
        <View className="mt-2">
          <DailyStats
            calories={{
              current: 500,
              goal: 2500,
            }}
            carbohydrates={{
              current: 150,
              goal: 300,
            }}
            proteins={{
              current: 80,
              goal: 150,
            }}
            fats={{
              current: 60,
              goal: 70,
            }}
          />
        </View>

        <View className="mt-7 h-px bg-gray-200" />
      </SafeAreaProvider>
    </View>
  );
}
