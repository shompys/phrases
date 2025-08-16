import { Skeleton } from "@/components/ui/skeleton";
import { useGridCardsContext } from "../context";
import { Card } from "./Card";
import { CardCreate } from "./CardCreate";

export const Cards = () => {
  const { cards, isLoading } = useGridCardsContext();

  return (
    <>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton className="w-full rounded-md h-46" key={index} />
        ))
      ) : (
        <>
          <CardCreate />
          {cards.map((card) => {
            return <Card key={card.id} {...card} />;
          })}
        </>
      )}
    </>
  );
};
Cards.displayName = "GridContent.Cards";
