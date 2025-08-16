import type { FC } from "react";
import { GridCardsContext } from "./context";
import { Cards } from "./Cards";

export type CardProps = {
  id: string;
  phrase: string;
};

type PhrasesCardProps = {
  cards: CardProps[];
  children: React.ReactNode;
  isLoading?: boolean;
};
const PhrasesCardComponent: FC<PhrasesCardProps> = ({
  cards,
  children,
  isLoading,
}) => {
  return (
    <GridCardsContext.Provider value={{ cards, isLoading }}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-3">
        {children}
      </div>
    </GridCardsContext.Provider>
  );
};
PhrasesCardComponent.displayName = "PhrasesCard";

export const PhrasesCard = Object.assign(PhrasesCardComponent, {
  Cards,
});
