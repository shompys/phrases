import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCurrentPageContext } from "@/ContextProviders/CurrentPageProvider";
import { cn } from "@/lib/utils";

import type { FC } from "react";

type PaginatorProps = {
  totalPages: number;
  prevPage: number;
  nextPage: number;
  className?: string;
};

export const Paginator: FC<PaginatorProps> = ({
  totalPages,
  prevPage,
  nextPage,
  className,
}) => {
  const { currentPage, setCurrentPage } = useCurrentPageContext();
  const maxVisiblePages = 4;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const half = Math.floor(maxVisiblePages / 2); //cantidad a mostrar desde el actual atras y adelante
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (currentPage === totalPages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
      end = totalPages;
    }

    return Array.from({ length: maxVisiblePages }, (_, i) => start + i);
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
