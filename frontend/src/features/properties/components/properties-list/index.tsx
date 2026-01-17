import { Loader } from "lucide-react";
import { useState, type FC } from "react";

import { useQueryErrorHandler } from "@/api/hooks/use-query-error-handler";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { Span } from "@/components/ui/typography/span";
import { PropertyCard } from "@/features/properties/components/property-card";
import { PropertyDetailModal } from "@/features/properties/components/property-detail-modal";
import { PropertyFilters } from "@/features/properties/components/property-filters";
import { usePaginatedProperties } from "@/queries/properties";
import type { PropertyListFiltersRecord, PropertyResponseRecord } from "@/services/properties/types";

export const PropertiesList: FC = () => {
  const [filters, setFilters] = useState<PropertyListFiltersRecord>({});
  const [page, setPage] = useState(1);
  const size = 50;
  const [selectedProperty, setSelectedProperty] = useState<PropertyResponseRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = usePaginatedProperties({
    ...filters,
    page,
    size,
  });

  // Automatic error notification
  useQueryErrorHandler({ isError, error });

  const handleFiltersChange = (newFilters: PropertyListFiltersRecord): void => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
  };

  const handleReadMore = (property: PropertyResponseRecord): void => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PropertyFilters onFiltersChange={handleFiltersChange} initialFilters={filters} />

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-opacity dark:bg-gray-900/70">
            <Loader className="h-10 w-10 animate-[spin_1.2s_linear_infinite] text-gray-600 dark:text-gray-300" />
          </div>
        )}

        {data && data.items.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((property) => (
                <PropertyCard key={property.id} property={property} onReadMore={handleReadMore} />
              ))}
            </div>

            {data.pages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {data.pages}
                </Span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                  disabled={page === data.pages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Paragraph className="text-lg text-gray-600 dark:text-gray-400">
                No properties found. Try adjusting your filters.
              </Paragraph>
            </div>
          )
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
