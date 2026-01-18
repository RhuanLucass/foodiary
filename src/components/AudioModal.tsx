import { StatusBar } from 'expo-status-bar';
import {
  CheckIcon,
  MicIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { cn } from '../utils/cn';
import { Button } from './Button';

interface IAudioModalProps {
  open: boolean;
  onClose: () => void;
}

export function AudioModal({ onClose, open }: IAudioModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<null | string>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleStartRecording() {
    setIsRecording(true);
  }

  function handleStopRecording() {
    setIsRecording(false);
    setAudioUri('mock-audio-uri');
  }

  function handlePlay() {
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleDeleteAudio() {
    setAudioUri(null);
    setIsPlaying(false);
  }

  function handleCloseModal() {
    setAudioUri(null);
    setIsRecording(false);
    setIsPlaying(false);
    onClose();
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      onRequestClose={handleCloseModal}
      visible={open}
      animationType="slide"
    >
      <StatusBar style="light" />

      <View className="flex-1 bg-black">
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <View className="flex-row p-5">
              <Button size="icon" color="dark" onPress={handleCloseModal}>
                <XIcon size={20} color={colors.gray[500]} />
              </Button>
            </View>

            <View className="flex-1 items-center justify-center">
              <View className="size-[265px] items-center justify-center rounded-full border border-gray-700/10">
                <View
                  className={cn(
                    'size-[227px] items-center justify-center rounded-full border border-gray-700/50',
                    isRecording && 'border-lime-600/50'
                  )}
                >
                  <View
                    className={cn(
                      'size-[179px] rounded-full bg-gray-700/10',
                      isRecording && 'bg-lime-600/10'
                    )}
                  />
                </View>
              </View>

              <Text className="mt-8 w-[192px] text-center font-sans-regular text-base text-white">
                Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
              </Text>
            </View>

            {!audioUri && (
              <View className="items-center gap-2 p-5 pb-20 pt-6">
                <View className="flex-row">
                  {!isRecording && (
                    <Button
                      size="icon"
                      color="dark"
                      onPress={handleStartRecording}
                    >
                      <MicIcon size={20} color={colors.lime[600]} />
                    </Button>
                  )}

                  {isRecording && (
                    <Button
                      size="icon"
                      color="dark"
                      onPress={handleStopRecording}
                    >
                      <SquareIcon size={20} color={colors.gray[500]} />
                    </Button>
                  )}
                </View>

                <Text className="w-[180px] text-center font-sans-regular text-base text-gray-100">
                  Toque no microfone para começar a gravar
                </Text>
              </View>
            )}

            {audioUri && (
              <View className="flex-row items-center justify-center gap-8 p-5 pb-20 pt-6">
                <Button size="icon" color="dark" onPress={handleDeleteAudio}>
                  <Trash2Icon size={20} color={colors.gray[500]} />
                </Button>

                {!isPlaying && (
                  <Button size="icon" color="dark" onPress={handlePlay}>
                    <PlayIcon size={20} color={colors.lime[600]} />
                  </Button>
                )}
                {isPlaying && (
                  <Button size="icon" color="dark" onPress={handlePause}>
                    <PauseIcon size={20} color={colors.lime[600]} />
                  </Button>
                )}

                <Button size="icon">
                  <CheckIcon size={20} color={colors.black[700]} />
                </Button>
              </View>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
