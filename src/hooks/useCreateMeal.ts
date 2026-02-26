import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAsync } from 'expo-file-system/legacy';
import { httpClient } from '../services/httpClient';

type CreateMealResponse = {
  uploadURL: string;
  mealId: string;
};

type CreateMealParams = {
  fileType: 'image/jpeg' | 'audio/m4a';
  onSuccess(mealId: string): void;
};

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
  const queryClient = useQueryClient();

  const { mutateAsync: createMeal, isPending: isLoading } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealResponse>('/meals', {
        fileType,
      });

      await uploadAsync(data.uploadURL, uri, {
        httpMethod: 'PUT',
        uploadType: 1, // FileSystemUploadType.BINARY_CONTENT
      });

      return { mealId: data.mealId };
    },
    onSuccess: ({ mealId }) => {
      onSuccess(mealId);
      queryClient.refetchQueries({ queryKey: ['meals'] });
    },
  });

  return {
    createMeal,
    isLoading,
  };
}
