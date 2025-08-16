import { useMutation } from "@tanstack/react-query";
import { createSeed } from ".";
import { keyPhrases } from "../phrases/usePhrases";
import { queryClient } from "@/lib/QueryClientProvider";

export const useSeed = () => {
  return useMutation({
    mutationFn: createSeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keyPhrases] });
    },
  });
};
