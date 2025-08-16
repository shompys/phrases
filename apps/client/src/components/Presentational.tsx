import { useGetPhrases } from "@/services/phrases/usePhrases";
import { useState } from "react";
import { SearchField } from "./SearchField";
import { PhrasesCard } from "./PhrasesCard";
import { Paginator } from "./Paginator";

export const Presentational = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  const handleSearch = (search: string) => {
    setSearch(search);
    setCurrentPage(1);
  };

  const { data, isLoading } = useGetPhrases({
    phrase: search,
    pageNumber: currentPage,
    limit: 14,
  });

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-screen pt-5 gap-y-5">
      <div className="flex items-center flex-col gap-y-3 lg:flex-row">
        <SearchField
          search={search}
          handleSearch={handleSearch}
          className="lg:w-1/2"
        />
        <p className="lg:ml-auto">Total de frases: {data?.totalItems}</p>
      </div>
      <PhrasesCard cards={data?.data || []} isLoading={isLoading}>
        <PhrasesCard.Cards />
      </PhrasesCard>
      <Paginator
        className="mt-auto"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={data?.totalPages || 0}
        prevPage={data?.prevPage || 0}
        nextPage={data?.nextPage || 0}
      />
    </div>
  );
};
