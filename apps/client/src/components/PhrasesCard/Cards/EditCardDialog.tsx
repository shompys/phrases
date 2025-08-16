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
import { useUpdatePhrase } from "@/services/phrases/usePhrases";
import { Button } from "@/components/ui/button";

type EditCardDialogProps = {
  className?: string;
  phrase: string;
  id: string;
};

export const EditCardDialog: FC<EditCardDialogProps> = ({
  className,
  id,
  phrase,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phraseState, setPhraseState] = useState(phrase);

  const { mutateAsync: updatePhrase } = useUpdatePhrase();
  const handleConfirm = async () => {
    try {
      await updatePhrase({
        id,
        phrase: phraseState,
      });
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
          <path d="M13.5 6.5l4 4" />
        </svg>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar frase</DialogTitle>
          <DialogDescription>Edita la frase</DialogDescription>
        </DialogHeader>
        <Card
          mode="edit"
          id={id}
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
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </AlertDialogUI>
  );
};
