"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const baseBtnClasses =
    "h-9 min-h-9 w-9 min-w-9 p-0 text-sm font-medium border-2 transition-colors";

  const getPages = () => {
    const pages: (number | "...")[] = [];

    const siblings = 1; // current ke left/right pages

    const left = Math.max(2, currentPage - siblings);
    const right = Math.min(totalPages - 1, currentPage + siblings);

    pages.push(1);

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* PREV */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          baseBtnClasses,
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* PAGE NUMBERS */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="w-9 text-center text-muted-foreground select-none"
            >
              …
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={isActive ? "default" : "outline"}
            className={cn(
              baseBtnClasses,
              isActive
                ? "border-primary font-semibold"
                : "border-transparent hover:border-border"
            )}
          >
            {page}
          </Button>
        );
      })}

      {/* NEXT */}
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          baseBtnClasses,
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
