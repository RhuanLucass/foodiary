import { Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { router, useLocalSearchParams } from 'expo-router';

export default function MealDatails() {
  const { mealId } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Meal Details Page: {mealId}</Text>
      <Button onPress={router.back}>Voltar</Button>
    </View>
  );
}
