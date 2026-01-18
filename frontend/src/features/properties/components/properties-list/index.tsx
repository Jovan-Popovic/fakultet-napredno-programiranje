import { Home } from "lucide-react";
import { useState, type FC } from "react";

import { useQueryErrorHandler } from "@/api/hooks/use-query-error-handler";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { PropertiesPagination } from "@/features/properties/components/properties-pagination";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyDetailModal } from "@/features/properties/components/property-detail-modal";
import { PropertyFilters } from "@/features/properties/components/property-filters";
import { usePaginatedProperties } from "@/queries/properties";
import type {
  PropertyListFiltersRecord,
  PropertyResponseRecord,
} from "@/services/properties/types";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

const PropertyCardSkeleton: FC = () => (
  <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
    <Skeleton className="aspect-video w-full" />
    <div className="space-y-3 p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

export const PropertiesList: FC = () => {
  const [filters, setFilters] = useState<PropertyListFiltersRecord>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [selectedProperty, setSelectedProperty] = useState<PropertyResponseRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = usePaginatedProperties({
    ...filters,
    page,
    size: pageSize,
  });

  // Automatic error notification
  useQueryErrorHandler({ isError, error });

  const handleFiltersChange = (newFilters: PropertyListFiltersRecord): void => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
  };

  const handlePageSizeChange = (newSize: number): void => {
    setPageSize(newSize);
    setPage(1); // Reset to first page on size change
  };

  const handleReadMore = (property: PropertyResponseRecord): void => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const hasActiveFilters =
    filters.cities?.length ||
    filters.propertyTypes?.length ||
    filters.sources?.length ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minArea ||
    filters.maxArea ||
    filters.rooms?.length ||
    filters.search;

  return (
    <div className="space-y-6">
      <PropertyFilters
        onFiltersChange={handleFiltersChange}
        onRefresh={() => void refetch()}
        initialFilters={filters}
        isLoading={isFetching}
      />

      <div
        className={joinClasses(
          "relative rounded-xl bg-white hover:shadow-xl dark:border dark:border-gray-700 dark:bg-gray-900/80",
          "p-6 transition-all duration-300"
        )}
      >
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        ) : data && data.items.length > 0 ? (
          <div className="space-y-6">
            <div
              className={joinClasses(
                "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                "transition-opacity duration-300",
                isFetching && "opacity-60"
              )}
            >
              {data.items.map((property) => (
                <PropertyCard key={property.id} property={property} onReadMore={handleReadMore} />
              ))}
            </div>

            {data.pages > 1 && (
              <PropertiesPagination
                currentPage={page}
                pageSize={pageSize}
                totalItems={data.total}
                totalPages={data.pages}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
                isLoading={isFetching}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
            <div className="rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 dark:from-blue-600/30 dark:to-purple-600/30">
              <Home className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="space-y-2">
              <Paragraph className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-lg font-semibold text-transparent dark:from-gray-300 dark:to-gray-100">
                No properties found
              </Paragraph>
              <Paragraph className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters to see more results.
              </Paragraph>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setFilters({});
                  setPage(1);
                }}
              >
                Clear all filters
              </Button>
            )}
          </div>
        )}
      </div>

      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
