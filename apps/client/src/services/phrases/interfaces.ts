import type { Pagination } from "../interfaces";

export type Phrase = {
  id: string;
  phrase: string;
  createdAt: string;
  updatedAt: string;
};

export type GetPhrasesFilters = Partial<{
  phrase: string;
  pageNumber: number;
  limit: number;
}>;
export type ResponsePhrases = Pagination<Phrase[]>;

export type UpdatePhrase = {
  id: string;
  phrase: string;
};
