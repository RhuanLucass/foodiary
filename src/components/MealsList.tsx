import { FlatList, Text, View } from 'react-native';
import { MealCard } from './MealCard';
import { DateSwitcher } from './DateSwitcher';
import { DailyStats } from './DailyStats';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

const meals = [
  {
    id: String(Math.random()),
    name: 'Café da manhã',
  },
  {
    id: String(Math.random()),
    name: 'Almoço',
  },
  {
    id: String(Math.random()),
    name: 'Lanche da tarde',
  },
  {
    id: String(Math.random()),
    name: 'Jantar',
  },
];

function MealsListHeader() {
  const { user } = useAuth();

  return (
    <>
      <DateSwitcher />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: 0,
            goal: user?.calories ?? 0,
          }}
          carbohydrates={{
            current: 0,
            goal: user?.carbohydrates ?? 0,
          }}
          proteins={{
            current: 0,
            goal: user?.proteins ?? 0,
          }}
          fats={{
            current: 0,
            goal: user?.fats ?? 0,
          }}
        />
      </View>

      <View className="mt-7 h-px bg-gray-200" />
      <Text className="m-5 font-sans-medium text-base tracking-[1.28px] text-black-700">
        REFEIÇÕES
      </Text>
    </>
  );
}

function Separator() {
  return <View className="h-8" />;
}

export function MealsList() {
  const { bottom } = useSafeAreaInsets();

  return (
    <FlatList
      data={meals}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      keyExtractor={(meal) => meal.id}
      ListHeaderComponent={MealsListHeader}
      ItemSeparatorComponent={Separator}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard id={meal.id} name={meal.name} />
        </View>
      )}
    />
  );
}
