import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';

export function DateSwitcher() {
  return (
    <View className="mt-3 flex-row items-center justify-between px-2">
      <TouchableOpacity className="size-12 items-center justify-center">
        <ChevronLeftIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>

      <Text className="font-sans-medium text-base tracking-[1.28px] text-gray-700">
        HOJE, 16 DE JANEIRO
      </Text>

      <TouchableOpacity className="size-12 items-center justify-center">
        <ChevronRightIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>
    </View>
  );
}
