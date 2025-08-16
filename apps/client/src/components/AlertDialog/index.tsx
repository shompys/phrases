import type { FC } from "react";
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
import { Button } from "../ui/button";

type AlertDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  labelAction: string;
  labelCancel: string;
  onOpenChange?: (e: boolean) => void;
  onConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isOpen?: boolean;
};

export const AlertDialog: FC<AlertDialogProps> = ({
  children,
  title,
  description,
  labelAction,
  labelCancel,
  onOpenChange,
  onConfirm,
  className,
  isOpen,
}) => {
  return (
    <AlertDialogUI
      onOpenChange={(e) => {
        onOpenChange?.(e);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              {labelCancel}
            </Button>
          </DialogClose>
          <Button variant="default" className="flex-1" onClick={onConfirm}>
            {labelAction}
          </Button>
        </DialogFooter>
      </DialogContent>
    </AlertDialogUI>
  );
};
