import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatMealDate } from '../utils/formatMealDate';

interface IMealCardProps {
  id: string;
  createdAt: Date;
  icon: string;
  name: string;
  foods: {name:string;}[];
}

export function MealCard({
  name,
  id,
  createdAt,
  icon,
  foods
}: IMealCardProps) {
  return (
    <Link href={`/meals/${id}`} asChild>
      <TouchableOpacity>
        <Text className="font-sans-regular text-base text-gray-700">
          {formatMealDate(createdAt)}
        </Text>

        <View className="mt-2 flex-row items-center gap-3 rounded-2xl border border-gray-400 px-4 py-5">
          <View className="size-12 items-center justify-center rounded-full bg-gray-200">
            <Text>{icon}</Text>
          </View>

          <View>
            <Text className="font-sans-regular text-base text-gray-700">
              {name}
            </Text>
            <Text className="font-sans-medium text-base text-black-700">
              {foods.map(({name}) => name).join(', ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
