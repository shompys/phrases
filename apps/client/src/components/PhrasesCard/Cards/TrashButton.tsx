import { AlertDialog } from "@/components/AlertDialog";
import { useCurrentPageContext } from "@/ContextProviders/CurrentPageProvider";
import { cn } from "@/lib/utils";
import { useDeletePhrase } from "@/services/phrases/usePhrases";
import { useState, type FC } from "react";

type TrashButtonProps = {
  id: string;
  className?: string;
};

export const TrashButton: FC<TrashButtonProps> = ({ id, className }) => {
  const { setCurrentPage } = useCurrentPageContext();
  const { mutateAsync: deletePhrase } = useDeletePhrase();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deletePhrase(id);
      setCurrentPage(1);
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AlertDialog
      title="Borrar frase"
      description="¿Estás seguro de querer borrar esta frase?"
      labelAction="Borrar"
      labelCancel="Cancelar"
      onConfirm={handleDelete}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
      isOpen={isOpen}
      className={cn(className, "absolute right-2 top-2 cursor-pointer")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </AlertDialog>
  );
};
