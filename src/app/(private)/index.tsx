import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeHeader } from '../../components/HomeHeader';
import { MealsList } from '../../components/MealsList';
import { CreateMealBottomBar } from '../../components/CreateMealBottomBar';

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <HomeHeader />
      <MealsList />

      <CreateMealBottomBar />
      <StatusBar style="dark" />
    </View>
  );
}
