import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeHeader } from '../components/HomeHeader';
import { MealsList } from '../components/MealsList';
import { CreateMealBottomBar } from '../components/CreateMealBottomBar';

export function Home() {
  return (
    <View className="flex-1">
      <HomeHeader />
      <MealsList />
      <CreateMealBottomBar />
      <StatusBar style="dark" />
    </View>
  );
}
