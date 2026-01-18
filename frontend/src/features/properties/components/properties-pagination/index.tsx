import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { type FC, useMemo } from "react";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu/checkbox-item";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu/content";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu/trigger";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type PropertiesPaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading?: boolean;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];

  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
  }

  return pages;
};

export const PropertiesPagination: FC<PropertiesPaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
  isLoading = false,
}) => {
  const currentDisplayFrom = totalItems === 0 ? 0 : currentPage === 1 ? 1 : pageSize * (currentPage - 1) + 1;

  const currentDisplayTo =
    totalItems < pageSize || currentPage === totalPages ? totalItems : pageSize * currentPage;

  const pageNumbers = useMemo(() => generatePageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  const pageSizePicker = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={joinClasses(
            "theme-transition rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50",
            "dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
            isLoading && "cursor-not-allowed opacity-50"
          )}
          disabled={isLoading}
        >
          {pageSize} / page
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        {PAGE_SIZE_OPTIONS.map((size) => (
          <DropdownMenuCheckboxItem
            key={size}
            checked={pageSize === size}
            onCheckedChange={() => onPageSizeChange(size)}
            className="cursor-pointer px-2 py-1.5 text-sm capitalize"
          >
            {size} / page
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const previousButton = (
    <button
      className={joinClasses(
        "theme-transition relative inline-flex items-center rounded-l-md border border-gray-300 px-2 py-2 hover:bg-gray-50",
        "dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
        "focus:z-20 focus:outline-offset-0",
        (currentPage === 1 || isLoading) && "cursor-not-allowed opacity-50"
      )}
      disabled={currentPage === 1 || isLoading}
      onClick={() => onPageChange(currentPage - 1)}
      aria-label="Previous page"
    >
      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );

  const nextButton = (
    <button
      className={joinClasses(
        "theme-transition relative inline-flex items-center rounded-r-md border border-gray-300 px-2 py-2 hover:bg-gray-50",
        "dark:border-gray-700 dark:text-white dark:hover:bg-gray-700",
        "focus:z-20 focus:outline-offset-0",
        (currentPage === totalPages || isLoading) && "cursor-not-allowed opacity-50"
      )}
      disabled={currentPage === totalPages || isLoading}
      onClick={() => onPageChange(currentPage + 1)}
      aria-label="Next page"
    >
      <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={joinClasses(
        "theme-transition flex items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-3 sm:px-6",
        "dark:border-gray-700 dark:bg-gray-800"
      )}
    >
      {/* Mobile View */}
      <div className="w-full sm:hidden">
        <div className="flex w-full justify-between">
          <button
            className={joinClasses(
              "theme-transition relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50",
              "dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
              (currentPage === 1 || isLoading) && "cursor-not-allowed opacity-50"
            )}
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className={joinClasses(
              "theme-transition relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50",
              "dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
              (currentPage === totalPages || isLoading) && "cursor-not-allowed opacity-50"
            )}
            disabled={currentPage === totalPages || isLoading}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <div className="mt-4 flex w-full justify-end">{pageSizePicker}</div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <p className="theme-transition text-sm dark:text-white">
          Showing <span className="font-medium">{currentDisplayFrom}</span> to{" "}
          <span className="font-medium">{currentDisplayTo}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>

        <div className="flex items-center gap-4">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {previousButton}

            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className={joinClasses(
                      "theme-transition relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm",
                      "dark:border-gray-700 dark:text-white"
                    )}
                  >
                    ...
                  </span>
                );
              }

              const page = pageNumber as number;
              const isActive = page === currentPage;

              return (
                <button
                  key={page}
                  className={joinClasses(
                    "theme-transition relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50",
                    "dark:border-gray-700 dark:hover:bg-gray-700",
                    "focus:z-20 focus:outline-offset-0",
                    isActive &&
                      "z-10 border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                    !isActive && "dark:text-white",
                    isLoading && "cursor-not-allowed opacity-50"
                  )}
                  disabled={isLoading}
                  onClick={() => onPageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </button>
              );
            })}

            {nextButton}
          </nav>

          {pageSizePicker}
        </div>
      </div>
    </div>
  );
};
