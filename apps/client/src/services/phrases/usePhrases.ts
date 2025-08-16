import { useMutation, useQuery } from "@tanstack/react-query";
import { createPhrase, deletePhrase, getPhrases, updatePhrase } from ".";
import type { GetPhrasesFilters } from "./interfaces";
import { queryClient } from "../../lib/QueryClientProvider";

export const keyPhrases = "phrases";

export const useGetPhrases = (filters?: GetPhrasesFilters) => {
  const filterList = Object.entries(filters ?? {}).filter(
    ([_, value]) => value !== undefined
  );
  const filtersMap = Object.fromEntries(filterList);

  return useQuery({
    queryKey: filterList.length > 0 ? [keyPhrases, filtersMap] : [keyPhrases],
    queryFn: () => getPhrases(filtersMap),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
};

const invalidateQueries = () => {
  queryClient.invalidateQueries({ queryKey: [keyPhrases] });
};

export const useCreatePhrase = () => {
  return useMutation({
    mutationFn: createPhrase,
    onSuccess: invalidateQueries,
  });
};

export const useDeletePhrase = () => {
  return useMutation({
    mutationFn: deletePhrase,
    onSuccess: invalidateQueries,
  });
};

export const useUpdatePhrase = () => {
  return useMutation({
    mutationFn: updatePhrase,
    onSuccess: invalidateQueries,
  });
};
