import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from './Button';
import { CameraIcon, MicIcon } from 'lucide-react-native';
import { useState } from 'react';
import { AudioModal } from './AudioModal';

export function CreateMealBottomBar() {
  const { bottom } = useSafeAreaInsets();

  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  return (
    <View
      className="absolute bottom-0 z-10 w-full border-t border-gray-400 bg-white"
      style={{ height: 80 + bottom }}
    >
      <View className="mx-auto mt-4 flex-row gap-4">
        <Button
          size="icon"
          color="gray"
          onPress={() => setIsAudioModalOpen(true)}
        >
          <MicIcon />
        </Button>

        <Button size="icon" color="gray">
          <CameraIcon />
        </Button>
      </View>

      <AudioModal
        open={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
    </View>
  );
}
