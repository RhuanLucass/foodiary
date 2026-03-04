import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'lucide-react-native';
import { Logo } from '../../../components/Logo';
import { httpClient } from '../../../services/httpClient';
import { colors } from '../../../styles/colors';
import { formatMealDate } from '../../../utils/formatMealDate';

type Meal = {
  id: string;
  createdAt: string;
  icon: string;
  name: string;
  status: 'uploading' | 'processing' | 'success' | 'failed';
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
}

export default function MealDetails() {
  const { mealId } = useLocalSearchParams();

  const { data: meal, isFetching } = useQuery({
    queryKey: ['meal', mealId],
    queryFn: async () => {
      const { data } = await httpClient.get<{ meal: Meal }>(`/meals/${mealId}`);
      return data.meal;
    },
    refetchInterval: (query) => {
      const currentStatus = query.state.data?.status;
      
      if (currentStatus === 'success' || currentStatus === 'failed') {
        return false;
      }

      return 2_000;
    },
  });

  if (isFetching || meal?.status !== 'success') {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  const totalNutrients = meal.foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      proteins: acc.proteins + food.proteins,
      carbohydrates: acc.carbohydrates + food.carbohydrates,
      fats: acc.fats + food.fats,
    }),
    { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
  );

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="bg-lime-400">
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity
            onPress={router.back}
            className="size-12 items-center justify-center"
          >
            <ChevronLeftIcon size={24} color={colors.black[700]} />
          </TouchableOpacity>
          
          <Text className="font-sans-semibold text-lg text-black-700">
            Detalhes da Refeição
          </Text>
          
          <View className="size-12" />
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header da Refeição */}
        <View className="items-center px-4 py-6">
          <View className="size-20 items-center justify-center rounded-full bg-gray-200">
            <Text className="text-5xl">{meal.icon}</Text>
          </View>
          
          <Text className="mt-4 font-sans-bold text-2xl text-black-700">
            {meal.name}
          </Text>
          
          <Text className="mt-1 font-sans-regular text-sm text-gray-700">
            {formatMealDate(new Date(meal.createdAt))}
          </Text>
        </View>

        {/* Resumo Nutricional */}
        <View className="mx-4 mb-6 rounded-2xl bg-gray-100 p-4">
          <Text className="mb-4 font-sans-semibold text-base text-black-700">
            Resumo Nutricional
          </Text>
          
          <View className="flex-row justify-between">
            <View className="w-1/4 items-center">
              <Text className="font-sans-bold text-lg text-support-tomato">
                {Math.round(totalNutrients.calories)}
              </Text>
              <Text className="mt-1 text-center font-sans-regular text-xs text-gray-700">
                Calorias
              </Text>
            </View>

            <View className="w-1/4 items-center">
              <Text className="font-sans-bold text-lg text-support-teal">
                {Math.round(totalNutrients.proteins)}g
              </Text>
              <Text className="mt-1 text-center font-sans-regular text-xs text-gray-700">
                Proteínas
              </Text>
            </View>

            <View className="w-1/4 items-center">
              <Text className="font-sans-bold text-lg text-support-yellow">
                {Math.round(totalNutrients.carbohydrates)}g
              </Text>
              <Text className="mt-1 text-center font-sans-regular text-xs text-gray-700">
                Carboidratos
              </Text>
            </View>

            <View className="w-1/4 items-center">
              <Text className="font-sans-bold text-lg text-support-orange">
                {Math.round(totalNutrients.fats)}g
              </Text>
              <Text className="mt-1 text-center font-sans-regular text-xs text-gray-700">
                Gorduras
              </Text>
            </View>
          </View>
        </View>

        {/* Lista de Alimentos */}
        <View className="px-4 pb-6">
          <Text className="mb-4 font-sans-semibold text-base text-black-700">
            Alimentos ({meal.foods.length})
          </Text>
          
          {meal.foods.map((food, index) => (
            <View
              key={index}
              className="mb-3 rounded-2xl border border-gray-400 p-4"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-sans-semibold text-base text-black-700">
                    {food.name}
                  </Text>
                  <Text className="mt-1 font-sans-regular text-sm text-gray-700">
                    {food.quantity}
                  </Text>
                </View>
                
                <Text className="font-sans-bold text-lg text-support-tomato">
                  {Math.round(food.calories)} cal
                </Text>
              </View>

              <View className="mt-3 flex-row justify-between border-t border-gray-300 pt-3">
                <View>
                  <Text className="font-sans-regular text-xs text-gray-700">
                    Proteínas
                  </Text>
                  <Text className="mt-1 font-sans-semibold text-sm text-support-teal">
                    {Math.round(food.proteins)}g
                  </Text>
                </View>

                <View>
                  <Text className="font-sans-regular text-xs text-gray-700">
                    Carboidratos
                  </Text>
                  <Text className="mt-1 font-sans-semibold text-sm text-support-yellow">
                    {Math.round(food.carbohydrates)}g
                  </Text>
                </View>

                <View>
                  <Text className="font-sans-regular text-xs text-gray-700">
                    Gorduras
                  </Text>
                  <Text className="mt-1 font-sans-semibold text-sm text-support-orange">
                    {Math.round(food.fats)}g
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}