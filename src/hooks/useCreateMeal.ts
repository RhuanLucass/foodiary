import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../services/httpClient";

type CreateMealResponse = {
  uploadURL: string
  mealId: string
}

export function useCreateMeal(fileType: 'image/jpeg' | 'audio/m4a') {
  const {mutateAsync: createMeal} = useMutation({
    mutationFn: async (uri: string) => {
      console.log('1. Iniciando upload de imagem, URI:', uri);
      
      const {data} = await httpClient.post<CreateMealResponse>('/meals', {
        fileType
      });
      
      console.log('2. URL pré-assinada recebida');

      // Lê o arquivo diretamente como blob usando fetch
      const fileBlob = await fetch(uri).then(r => r.blob());
      
      console.log('3. Arquivo lido como blob, tamanho:', fileBlob.size, 'tipo:', fileBlob.type);

      // Upload usando Fetch nativo com o blob
      const uploadResponse = await fetch(data.uploadURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: fileBlob,
      });

      console.log('4. Upload finalizado, status:', uploadResponse.status);

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      console.log('5. Upload concluído com sucesso! MealId:', data.mealId);
    }
  });

  return {
    createMeal
  }
}