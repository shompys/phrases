import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import type { FC } from "react";

type PaginatorProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  prevPage: number;
  nextPage: number;
  className?: string;
};

export const Paginator: FC<PaginatorProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  prevPage,
  nextPage,
  className,
}) => {
  const maxVisiblePages = 4;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const half = Math.floor(maxVisiblePages / 2); //cantidad a mostrar desde el actual atras y adelante
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    console.log("end: ", end);
    if (end === totalPages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }
    console.log("start: ", start);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const showStartEllipsis = visiblePages[0] > 1;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;
  return (
    <Pagination className={cn("py-6", className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => {
              if (prevPage) {
                setCurrentPage(prevPage);
              }
            }}
          />
        </PaginationItem>
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {visiblePages.map((page) => (
          <PaginationItem key={page} className="cursor-pointer">
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => {
              if (nextPage) {
                setCurrentPage(nextPage);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
