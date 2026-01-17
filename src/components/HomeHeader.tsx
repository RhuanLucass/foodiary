import { LogOutIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

export function HomeHeader() {
  return (
    <View className="bg-lime-400">
      <SafeAreaView
        edges={['top']}
        className="flex-row items-center justify-between px-4 py-3"
      >
        <View>
          <Text className="font-sans-regular text-sm text-gray-700">
            Olá, 👋
          </Text>
          <Text className="font-sans-semibold text-base text-black-700">
            Rhuan
          </Text>
        </View>

        <TouchableOpacity className="size-12 items-center justify-center">
          <LogOutIcon size={20} color={colors.black[700]} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
