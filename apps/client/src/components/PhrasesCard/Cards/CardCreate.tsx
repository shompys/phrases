import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dialog as AlertDialogUI,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState, type FC } from "react";
import { Card } from "./Card";
import { useCreatePhrase } from "@/services/phrases/usePhrases";
import { Button } from "@/components/ui/button";
import { useCurrentPageContext } from "@/ContextProviders/CurrentPageProvider";

type CreateCardProps = {
  className?: string;
};

export const CardCreate: FC<CreateCardProps> = ({ className }) => {
  const [phraseState, setPhraseState] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { setCurrentPage } = useCurrentPageContext();

  const { mutateAsync: createPhrase } = useCreatePhrase();

  const handleConfirm = async () => {
    try {
      await createPhrase(phraseState);
      setCurrentPage(1);
      setPhraseState("");
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AlertDialogUI
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild className={cn("cursor-pointer", className)}>
        <button
          className="h-46 cursor-pointer rounded-full overflow-hidden relative border w-46 m-auto hover:bg-green-1000 transition-all duration-300"
          onClick={() => ""}
        >
          <div className="absolute left-8 top-0 bottom-0 w-px bg-red-200 opacity-40" />
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-blue-200 opacity-30"
                style={{ top: `${20 + i * 20}px` }}
              />
            ))}
          </div>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id="plusGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="50%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              <radialGradient id="highlight" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g transform="translate(50,50)">
              <rect
                x="-6"
                y="-30"
                width="12"
                height="60"
                rx="6"
                fill="url(#plusGradient)"
              />

              <rect
                x="-4"
                y="-29"
                width="3"
                height="58"
                rx="1.5"
                fill="url(#highlight)"
              />

              <rect
                x="-30"
                y="-6"
                width="60"
                height="12"
                rx="6"
                fill="url(#plusGradient)"
              />

              <rect
                x="-29"
                y="-4"
                width="58"
                height="3"
                rx="1.5"
                fill="url(#highlight)"
              />

              <g opacity="0.7">
                <path
                  d="M-20 -20L-12 -12"
                  stroke="#ECFDF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 -20L12 -12"
                  stroke="#ECFDF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M-20 20L-12 12"
                  stroke="#ECFDF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M20 20L12 12"
                  stroke="#ECFDF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nueva frase</DialogTitle>
          <DialogDescription>Vas a crear una nueva frase!!</DialogDescription>
        </DialogHeader>
        <Card
          mode="create"
          phrase={phraseState}
          onCustomChange={setPhraseState}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" className="flex-1" onClick={handleConfirm}>
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </AlertDialogUI>
  );
};
