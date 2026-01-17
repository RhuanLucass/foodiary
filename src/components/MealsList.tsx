import { FlatList, Text, View } from 'react-native';
import { MealCard } from './MealCard';
import { DateSwitcher } from './DateSwitcher';
import { DailyStats } from './DailyStats';

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
  return (
    <>
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
  return (
    <FlatList
      data={meals}
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
