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
import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from 'expo-router';

type Meal = {
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

interface IMealsListHeaderProps {
  currentDate: Date;
  onPreviousDate(): void;
  onNextDate(): void;
  meals: Meal[];
}

function MealsListHeader({
    currentDate,
    onNextDate,
    onPreviousDate,
    meals
  }: IMealsListHeaderProps) {
  const { user } = useAuth();

  const totals = useMemo(() => {
    let calories = 0;
    let proteins = 0;
    let carbohydrates = 0;
    let fats = 0;

    for(const meal of meals) {
      for(const food of meal.foods) {
        calories += food.calories;
        proteins += food.proteins;
        carbohydrates += food.carbohydrates;
        fats += food.fats;
      }
    }

    return {
      calories,
      proteins,
      carbohydrates,
      fats,
    }
  },[meals])

  return (
    <>
      <DateSwitcher
        currentDate={currentDate}
        onNextDate={onNextDate}
        onPreviousDate={onPreviousDate}
      />
      <View className="mt-2">
        <DailyStats
          calories={{
            current: totals.calories,
            goal: user!.calories,
          }}
          carbohydrates={{
            current: totals.carbohydrates,
            goal: user!.carbohydrates,
          }}
          proteins={{
            current: totals.proteins,
            goal: user!.proteins,
          }}
          fats={{
            current: totals.fats,
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

  const [currentDate, setCurrentDate] = useState(new Date());

  const dateParam = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }, [currentDate])

  const { data: meals, refetch } = useQuery({
    queryKey: ['meals', dateParam],
    staleTime: 15_000,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meal[] }>('/meals', {
        params: {
          date: dateParam,
        },
      });
      return data.meals;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  )

  function handlePreviousDate() {
    setCurrentDate(prevState => {
      const newDate = new Date(prevState);
      newDate.setDate(newDate.getDate() - 1);

      return newDate;
    })
  }

    function handleNextDate() {
    setCurrentDate(prevState => {
      const newDate = new Date(prevState);
      newDate.setDate(newDate.getDate() + 1);

      return newDate;
    })
  }

  return (
    <FlatList
      data={meals}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      keyExtractor={(meal) => meal.id}
      ListHeaderComponent={(
        <MealsListHeader
          onNextDate={handleNextDate}
          onPreviousDate={handlePreviousDate}
          currentDate={currentDate}
          meals={meals ?? []}
        />
      )}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={EmptyList}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard
            id={meal.id}
            name={meal.name}
            icon={meal.icon}
            foods={meal.foods}
            createdAt={new Date(meal.createdAt)}
          />
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
