import { Search } from "lucide-react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Span } from "@/components/ui/typography/span";
import type { PropertyListFiltersRecord } from "@/services/properties/types";

export type PropertyFiltersProps = {
  onFiltersChange: (filters: PropertyListFiltersRecord) => void;
  initialFilters?: PropertyListFiltersRecord;
};

export const PropertyFilters: FC<PropertyFiltersProps> = ({
  onFiltersChange,
  initialFilters = {},
}) => {
  const [search, setSearch] = useState(initialFilters.search || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || "");

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
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-6">
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
              className="pl-9"
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
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="solid" color="primary">
          Apply Filters
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};
