import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import bgImage from '../../assets/onboarding-bg/onboarding-bg.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../components/Logo';
import { Button } from '../../components/Button';
import { Link } from 'expo-router';

export default function SignIn() {
  return (
    <ImageBackground source={bgImage} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-between">
          <View className="mx-auto mt-4">
            <Logo width={100} height={32} />
          </View>

          <View className="w-full items-center">
            <Text className="w-[311px] text-center font-sans-semibold text-[32px] text-white">
              Controle sua dieta de forma simples
            </Text>

            <View className="mt-6 w-full p-5">
              <Link href="/signup">
                <Button className="w-full">Criar conta</Button>
              </Link>
              <View className="mt-[30px] flex-row items-center justify-center gap-2">
                <Text className="font-sans-regular text-base text-white">
                  Já tem conta?
                </Text>
                <Link href="/signin">
                  <Text className="font-sans-medium text-base text-lime-500">
                    Acesse agora!
                  </Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
