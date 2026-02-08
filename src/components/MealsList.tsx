import { FlatList, Text, View } from 'react-native';
import { MealCard } from './MealCard';
import { DateSwitcher } from './DateSwitcher';
import { DailyStats } from './DailyStats';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../services/httpClient';
import { UtensilsCrossedIcon } from 'lucide-react-native';
import { colors } from '../styles/colors';

type Meals = {
  name: string;
  id: string;
  icon: string;
  foods: {
    name: string;
    quantity: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    fats: number;
  }[];
  createdAt: string;
};

function MealsListHeader() {
  const { user } = useAuth();

  return (
    <>
      <DateSwitcher />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: 0,
            goal: user!.calories,
          }}
          carbohydrates={{
            current: 0,
            goal: user!.carbohydrates,
          }}
          proteins={{
            current: 0,
            goal: user!.proteins,
          }}
          fats={{
            current: 0,
            goal: user!.fats,
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

  const { data: meals } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meals[] }>('/meals', {
        params: {
          date: new Date().toISOString(),
        },
      });
      return data.meals;
    },
  });

  return (
    <FlatList
      data={meals}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      keyExtractor={(meal) => meal.id}
      ListHeaderComponent={MealsListHeader}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={EmptyList}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard id={meal.id} name={meal.name} />
        </View>
      )}
    />
  );
}

function EmptyList() {
  return (
    <View className="mt-16 items-center px-8">
      <View className="size-16 items-center justify-center rounded-full bg-gray-200">
        <UtensilsCrossedIcon size={28} color={colors.gray[600]} />
      </View>

      <Text className="mt-4 text-center font-sans-semibold text-lg text-black-700">
        Nenhuma refeição registrada
      </Text>

      <Text className="mt-2 text-center font-sans-regular text-base text-gray-700">
        Comece adicionando sua primeira refeição do dia usando os botões abaixo
      </Text>
    </View>
  );
}
