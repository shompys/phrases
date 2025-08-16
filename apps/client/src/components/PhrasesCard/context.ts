import { createContext, useContext } from "react";
import type { CardProps } from ".";

type GridCardsContextType = {
  cards: CardProps[];
  isLoading?: boolean;
};

export const GridCardsContext = createContext<GridCardsContextType | null>(
  null
);

export const useGridCardsContext = () => {
  const context = useContext(GridCardsContext);
  if (!context) {
    throw new Error(
      "useGridCardsContext must be used within a GridCardsProvider"
    );
  }
  return context;
};
