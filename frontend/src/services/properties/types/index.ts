import type { ApiPaginationResponseRecord } from "@/api/types/pagination";

/**
 * Property response record from API
 */
export type PropertyResponseRecord = {
  id: number;
  source: "estitor" | "realitica";
  link: string;
  city: string;
  location: string;
  title: string;
  propertyType: "Stan" | "Kuća" | "Garsonjera" | "Apartman" | "Vikendica" | "Poslovni prostor" | "Zemljište" | "Unknown" | null;
  priceRaw: string;
  areaRaw: string | null;
  roomsRaw: string | null;
  priceEur: number | null;
  areaSqm: number | null;
  rooms: number | null;
  priceDisplay: string;
  areaDisplay: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Filters for listing properties
 */
export type PropertyListFiltersRecord = {
  cities?: string[];
  propertyTypes?: string[];
  sources?: string[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number[];
  search?: string;
  page?: number;
  size?: number;
};

/**
 * Request record for listing properties with pagination
 */
export type GetPaginatedPropertiesRequestRecord = PropertyListFiltersRecord;

/**
 * Response record for paginated properties list
 */
export type GetPaginatedPropertiesResponseRecord = ApiPaginationResponseRecord<PropertyResponseRecord>;

/**
 * Response record for single property
 */
export type GetPropertyResponseRecord = PropertyResponseRecord;

/**
 * Response record for cities list
 */
export type GetCitiesResponseRecord = {
  cities: string[];
};
