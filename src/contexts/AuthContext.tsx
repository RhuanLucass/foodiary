import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useEffect, useState } from 'react';
import { httpClient } from '../services/httpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  email: string;
  name: string;
  id: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
};

type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = {
  height: number;
  weight: number;
  goal: string;
  gender: string;
  birthDate: string;
  activityLevel: number;
  account: {
    email: string;
    password: string;
    name: string;
  };
};

interface IAuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signIn(params: SignInParams): Promise<void>;
  signUp(params: SignUpParams): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);

const TOKEN_STORAGE_KEY = '@food-diary::token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      setToken(data);
      setIsLoadingToken(false);
    }

    load();
  }, []);

  useEffect(() => {
    async function run() {
      if (!token) {
        return;
      }

      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    run();
  }, [token]);

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (params: SignInParams) => {
      const { data } = await httpClient.post('/signin', params);
      setToken(data.accessToken);
    },
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: async (params: SignUpParams) => {
      const { data } = await httpClient.post('/signup', params);
      setToken(data.accessToken);
    },
  });

  const { data: user, isFetching } = useQuery({
    enabled: !!token,
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await httpClient.get<{ user: User }>('/me');
      const { user } = data;
      return user;
    },
  });

  const signOut = useCallback(async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoggedIn: !!user,
        isLoading: isLoadingToken || isFetching,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
