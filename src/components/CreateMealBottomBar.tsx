import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';
import { CameraIcon, MicIcon } from 'lucide-react-native';

export function CreateMealBottomBar() {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 z-10 w-full border-t border-gray-400 bg-white"
      style={{ height: 80 + bottom }}
    >
      <View className="mx-auto mt-4 flex-row gap-4">
        <Button size="icon" color="gray">
          <MicIcon />
        </Button>

        <Button size="icon" color="gray">
          <CameraIcon />
        </Button>
      </View>
    </View>
  );
}
