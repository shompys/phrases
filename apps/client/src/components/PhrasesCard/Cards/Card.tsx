import type { FC } from "react";

import { cn } from "@/lib/utils";
import { capitalizeFirstLetter } from "@/utils/strings";

import { TrashButton } from "./TrashButton";
import { EditCardDialog } from "./EditCardDialog";

import { Textarea } from "@/components/ui/textarea";

type Mode = "edit" | "view" | "create";

type CardProps = {
  id?: string;
  phrase?: string;
  className?: string;
  mode?: Mode;
  onCustomChange?: (value: string) => void;
};

export const Card: FC<CardProps> = ({
  id,
  phrase,
  className,
  mode = "view",
  onCustomChange,
}) => {
  const isView = mode === "view";
  const isCreate = mode === "create";
  return (
    <div
      className={cn(
        "relative rounded-md h-46 text-sm flex items-center justify-center bg-gradient-to-b from-yellow-100 to-orange-50 shadow-md pl-8 whitespace-pre-line",
        className
      )}
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
      {!isView && (
        <Textarea
          className="max-w-4/5"
          value={phrase ?? ""}
          onChange={(e) => {
            onCustomChange?.(e.target.value);
          }}
        />
      )}
      {isView && (
        <>
          <p className="w-40 break-words text-center">
            {capitalizeFirstLetter(phrase ?? "")}
          </p>

          <EditCardDialog
            className="absolute right-2 bottom-2"
            id={id || ""}
            phrase={phrase ?? ""}
          />
        </>
      )}

      {!isCreate && <TrashButton id={id || ""} />}
    </div>
  );
};
