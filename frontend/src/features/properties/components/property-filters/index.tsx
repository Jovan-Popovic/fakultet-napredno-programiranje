import { ChevronDown, Filter, MapPin, Search } from "lucide-react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@/components/ui/collapsible/content";
import { CollapsibleTrigger } from "@/components/ui/collapsible/trigger";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select/basic";
import type { SelectOption } from "@/components/ui/select/common/types/options";
import { Span } from "@/components/ui/typography/span";
import { useCities } from "@/queries/properties";
import type { PropertyListFiltersRecord } from "@/services/properties/types";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type PropertyFiltersProps = {
  onFiltersChange: (filters: PropertyListFiltersRecord) => void;
  onRefresh?: () => void;
  initialFilters?: PropertyListFiltersRecord;
  isLoading?: boolean;
};

export const PropertyFilters: FC<PropertyFiltersProps> = ({
  onFiltersChange,
  onRefresh,
  initialFilters = {},
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState(initialFilters.search || "");
  const [selectedCities, setSelectedCities] = useState<SelectOption[]>([]);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice?.toString() || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice?.toString() || "");
  const [minArea, setMinArea] = useState(initialFilters.minArea?.toString() || "");
  const [maxArea, setMaxArea] = useState(initialFilters.maxArea?.toString() || "");
  const [priceError, setPriceError] = useState<string>("");
  const [areaError, setAreaError] = useState<string>("");

  const { data: citiesData, isLoading: isCitiesLoading } = useCities();

  const cityOptions: SelectOption[] = useMemo(
    () => (citiesData?.cities || []).map((city) => ({ value: city, label: city })),
    [citiesData]
  );

  // Initialize selected cities from initial filters
  useEffect(() => {
    if (initialFilters.cities && cityOptions.length > 0) {
      const selected = cityOptions.filter((option) =>
        initialFilters.cities?.includes(option.value as string)
      );
      setSelectedCities(selected);
    }
  }, [initialFilters.cities, cityOptions]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (selectedCities.length > 0) count++;
    if (minPrice) count++;
    if (maxPrice) count++;
    if (minArea) count++;
    if (maxArea) count++;
    return count;
  }, [search, selectedCities, minPrice, maxPrice, minArea, maxArea]);

  const validateRanges = (): boolean => {
    let isValid = true;

    // Validate price range
    if (minPrice && maxPrice) {
      const min = Number(minPrice);
      const max = Number(maxPrice);
      if (min > max) {
        setPriceError("Min price cannot be greater than max price");
        isValid = false;
      } else {
        setPriceError("");
      }
    } else {
      setPriceError("");
    }

    // Validate area range
    if (minArea && maxArea) {
      const min = Number(minArea);
      const max = Number(maxArea);
      if (min > max) {
        setAreaError("Min area cannot be greater than max area");
        isValid = false;
      } else {
        setAreaError("");
      }
    } else {
      setAreaError("");
    }

    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateRanges()) {
      return;
    }

    const filters: PropertyListFiltersRecord = {};

    if (search) filters.search = search;
    if (selectedCities.length > 0) {
      filters.cities = selectedCities.map((city) => city.value as string);
    }

    if (minPrice) filters.minPrice = Number(minPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    if (minArea) filters.minArea = Number(minArea);
    if (maxArea) filters.maxArea = Number(maxArea);

    onFiltersChange(filters);
    onRefresh?.();
  };

  const handleReset = (): void => {
    setSearch("");
    setSelectedCities([]);
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setPriceError("");
    setAreaError("");
    onFiltersChange({});
    onRefresh?.();
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <form
        onSubmit={handleSubmit}
        className={joinClasses(
          "space-y-4 rounded-xl border border-gray-300 bg-white/80 p-6 shadow-lg backdrop-blur-md transition-all duration-300",
          "dark:border-gray-700 dark:bg-gray-900/80",
          "hover:shadow-xl"
        )}
      >
        {/* Header with filter icon, active count, and collapse toggle */}
        <div className="flex items-center justify-between">
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
          <CollapsibleTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              aria-label={isOpen ? "Collapse filters" : "Expand filters"}
            >
              <ChevronDown
                className={joinClasses(
                  "h-4 w-4 transition-transform duration-200",
                  isOpen ? "rotate-180" : ""
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="space-y-4 pt-2">
            {/* Search and Cities Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Span className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</Span>
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
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
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <Span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cities
                  </Span>
                </div>
                <Select
                  isMulti
                  options={cityOptions}
                  value={selectedCities}
                  onChange={(selected) => setSelectedCities(selected as SelectOption[])}
                  placeholder="Select cities..."
                  isLoading={isCitiesLoading}
                  isDisabled={isLoading || isCitiesLoading}
                  isClearable
                  isSearchable
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range (€)
              </Span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    id="minPrice"
                    type="number"
                    value={minPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setMinPrice(e.target.value);
                      setPriceError("");
                    }}
                    placeholder="Min (e.g., 50,000)"
                    min="0"
                    className={joinClasses(
                      "transition-all duration-200",
                      priceError ? "border-red-500 focus:ring-red-500" : ""
                    )}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="maxPrice"
                    type="number"
                    value={maxPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setMaxPrice(e.target.value);
                      setPriceError("");
                    }}
                    placeholder="Max (e.g., 500,000)"
                    min="0"
                    className={joinClasses(
                      "transition-all duration-200",
                      priceError ? "border-red-500 focus:ring-red-500" : ""
                    )}
                    disabled={isLoading}
                  />
                </div>
              </div>
              {priceError && (
                <Span className="text-xs text-red-600 dark:text-red-400">{priceError}</Span>
              )}
            </div>

            {/* Area Range */}
            <div className="space-y-2">
              <Span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Area Range (m²)
              </Span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    id="minArea"
                    type="number"
                    value={minArea}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setMinArea(e.target.value);
                      setAreaError("");
                    }}
                    placeholder="Min (e.g., 30)"
                    min="0"
                    className={joinClasses(
                      "transition-all duration-200",
                      areaError ? "border-red-500 focus:ring-red-500" : ""
                    )}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    id="maxArea"
                    type="number"
                    value={maxArea}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setMaxArea(e.target.value);
                      setAreaError("");
                    }}
                    placeholder="Max (e.g., 200)"
                    min="0"
                    className={joinClasses(
                      "transition-all duration-200",
                      areaError ? "border-red-500 focus:ring-red-500" : ""
                    )}
                    disabled={isLoading}
                  />
                </div>
              </div>
              {areaError && (
                <Span className="text-xs text-red-600 dark:text-red-400">{areaError}</Span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                variant="solid"
                color="primary"
                loading={isLoading}
                disabled={isLoading || !!priceError || !!areaError}
              >
                Apply Filters
                {activeFiltersCount > 0 && !isLoading && ` (${activeFiltersCount})`}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
                Reset
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </form>
    </Collapsible>
  );
};
