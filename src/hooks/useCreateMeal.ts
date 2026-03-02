import { useMutation, useQueryClient } from '@tanstack/react-query';
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

      // Lê o arquivo diretamente como blob para manter integridade
      const fileBlob = await fetch(uri).then((r) => r.blob());

      // Upload usando Fetch nativo com o blob binário
      await fetch(data.uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': fileType,
        },
        body: fileBlob,
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
