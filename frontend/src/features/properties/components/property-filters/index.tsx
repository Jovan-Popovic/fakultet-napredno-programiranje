import { Filter, Search } from "lucide-react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Span } from "@/components/ui/typography/span";
import type { PropertyListFiltersRecord } from "@/services/properties/types";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type PropertyFiltersProps = {
  onFiltersChange: (filters: PropertyListFiltersRecord) => void;
  initialFilters?: PropertyListFiltersRecord;
  isLoading?: boolean;
};

export const PropertyFilters: FC<PropertyFiltersProps> = ({
  onFiltersChange,
  initialFilters = {},
  isLoading = false,
}) => {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || "");

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    return count;
  }, [search, minPrice, maxPrice]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const filters: PropertyListFiltersRecord = {};

    if (search) filters.search = search;
    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);

    onFiltersChange(filters);
  };

  const handleReset = (): void => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    onFiltersChange({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={joinClasses(
        "space-y-4 rounded-xl border border-gray-300 bg-white/70 p-6 shadow-lg backdrop-blur-md transition-all duration-300",
        "dark:border-gray-700 dark:bg-gray-900/70",
        "hover:shadow-xl"
      )}
    >
      {/* Header with filter icon and active count */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <Span className="text-lg font-semibold">Filters</Span>
        </div>
        {activeFiltersCount > 0 && (
          <Badge variant="default" className="bg-blue-500 text-white dark:bg-blue-600">
            {activeFiltersCount} active
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Span className="text-sm font-medium">Search</Span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              id="search"
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="pl-9 transition-all duration-200"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Span className="text-sm font-medium">Min Price (€)</Span>
          <Input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMinPrice(e.target.value)}
            placeholder="0"
            min="0"
            className="transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Span className="text-sm font-medium">Max Price (€)</Span>
          <Input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setMaxPrice(e.target.value)}
            placeholder="1,000,000"
            min="0"
            className="transition-all duration-200"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="solid" color="primary" loading={isLoading} disabled={isLoading}>
          Apply Filters
          {activeFiltersCount > 0 && !isLoading && ` (${activeFiltersCount})`}
        </Button>
        <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
          Reset
        </Button>
      </div>
    </form>
  );
};
