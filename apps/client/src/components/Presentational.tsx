import { useGetPhrases } from "@/services/phrases/usePhrases";
import { useState } from "react";
import { SearchField } from "./SearchField";
import { PhrasesCard } from "./PhrasesCard";
import { Paginator } from "./Paginator";
import { Button } from "./ui/button";
import { useSeed } from "@/services/seed/useSeed";
import { useCurrentPageContext } from "@/ContextProviders/CurrentPageProvider";

export const Presentational = () => {
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const { mutate: createSeed } = useSeed();

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
    <div className=" px-4 max-w-5xl mx-auto flex flex-col min-h-screen pt-5 gap-y-5">
      <div className="flex flex-col gap-y-3 items-center lg:items-stretch">
        <div className="flex items-center lg:items-end flex-col gap-y-3 lg:flex-row">
          <SearchField
            search={search}
            handleSearch={handleSearch}
            className="lg:w-1/2"
          />

          <p className="lg:ml-auto">Total de frases: {data?.totalItems}</p>
        </div>
        <Button
          variant="secondary"
          className="cursor-pointer w-fit"
          onClick={() => createSeed()}
        >
          Generar 70 Frases Mockeadas (elimina las existentes)
        </Button>
      </div>
      <PhrasesCard cards={data?.data || []} isLoading={isLoading}>
        <PhrasesCard.Cards />
      </PhrasesCard>
      <Paginator
        className="mt-auto"
        totalPages={data?.totalPages || 0}
        prevPage={data?.prevPage || 0}
        nextPage={data?.nextPage || 0}
      />
    </div>
  );
};
