import { useState, type FC } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "../../../hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type SearchFieldProps = {
  search: string;
  handleSearch: (search: string) => void;
  className?: string;
};
export const SearchField: FC<SearchFieldProps> = ({
  search,
  handleSearch,
  className,
}) => {
  const [searchValue, setSearchValue] = useState(search);
  useDebounce({
    delay: 500,
    callback: () => {
      handleSearch(searchValue.trim());
    },
    dependencies: [searchValue],
  });

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      <Label htmlFor="search">Buscar Frase:</Label>
      <Input
        placeholder="Buscar Frase"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
