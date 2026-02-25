import { useMutation } from '@tanstack/react-query';
import { httpClient } from '../services/httpClient';
import { router } from 'expo-router';

type CreateMealResponse = {
  uploadURL: string;
  mealId: string;
};

type CreateMealParams = {
  fileType: 'image/jpeg' | 'audio/m4a';
  onSuccess(mealId: string): void;
};

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
  const { mutateAsync: createMeal, isPending: isLoading } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealResponse>('/meals', {
        fileType,
      });

      // Lê o arquivo diretamente como blob usando fetch
      const fileBlob = await fetch(uri).then((r) => r.blob());

      // Upload usando Fetch nativo com o blob
      const uploadResponse = await fetch(data.uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: fileBlob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      return { mealId: data.mealId };
    },
    onSuccess: ({ mealId }) => {
      onSuccess(mealId);
    },
    onSettled: () => {},
  });

  return {
    createMeal,
    isLoading,
  };
}
