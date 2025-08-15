import { useMutation, useQuery } from "@tanstack/react-query";
import { createPhrase, getPhrases } from ".";
import type { GetPhrasesFilters } from "./interfaces";
import { queryClient } from "../../libs/QueryClientProvider";

const key = "phrases";
export const useGetPhrases = (filters?: GetPhrasesFilters) => {
  const filterList = Object.entries(filters ?? {}).filter(
    ([_, value]) => value !== undefined
  );
  const filtersMap = Object.fromEntries(filterList);

  return useQuery({
    queryKey: filterList.length > 0 ? [key, filtersMap] : [key],
    queryFn: () => getPhrases(filtersMap),
  });
};

export const useCreatePhrase = () => {
  return useMutation({
    mutationFn: (phrase: string) => createPhrase(phrase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};
