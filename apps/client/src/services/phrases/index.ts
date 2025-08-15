import { apiService } from "../api";
import type {
  GetPhrasesFilters,
  Phrase,
  ResponsePhrases,
  UpdatePhrase,
} from "./interfaces";

const hostname = "api";
const pathname = "phrases";

export const getPhrases = async (
  filters?: GetPhrasesFilters
): Promise<ResponsePhrases> => {
  const response = await apiService<ResponsePhrases>({
    hostname,
    pathname,
    ...(filters && { query: filters }),
  });
  return response;
};

export const createPhrase = async (phrase: string): Promise<Phrase> => {
  const response = await apiService<Phrase>({
    hostname,
    pathname,
    method: "POST",
    body: { phrase },
  });
  return response;
};

export const deletePhrase = async (id: string): Promise<Phrase> => {
  const response = await apiService<Phrase>({
    hostname,
    pathname: [pathname, id].join("/"),
    method: "DELETE",
  });
  return response;
};

export const updatePhrase = async ({
  id,
  phrase,
}: UpdatePhrase): Promise<Phrase> => {
  const response = await apiService<Phrase>({
    hostname,
    pathname: [pathname, id].join("/"),
    method: "PATCH",
    body: { phrase },
  });
  return response;
};
