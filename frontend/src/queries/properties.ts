/**
 * @module PropertiesHooks
 *
 * @description
 * Provides React Query hooks for interacting with properties service.
 */
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import type { QueryOptionsRecord } from "./types/query";

import type { ApiErrorResponseRecord } from "@/api/types/errors";
import { ReactQueryKeys } from "@/queries/keys/queries";
import { propertiesService } from "@/services/properties";
import type {
  GetPaginatedPropertiesRequestRecord,
  GetPaginatedPropertiesResponseRecord,
  GetPropertyResponseRecord,
} from "@/services/properties/types";

const { getPaginatedProperties, getProperty } = propertiesService;

export const usePaginatedProperties = (
  data: GetPaginatedPropertiesRequestRecord,
  options?: QueryOptionsRecord<GetPaginatedPropertiesResponseRecord, ApiErrorResponseRecord>
): UseQueryResult<GetPaginatedPropertiesResponseRecord, ApiErrorResponseRecord> =>
  useQuery({
    queryKey: [ReactQueryKeys.PROPERTIES, data],
    queryFn: async () => await getPaginatedProperties(data),
    refetchOnWindowFocus: false,
    placeholderData: (previous) => previous,
    ...options,
  });

export const useProperty = (
  id: number,
  options?: QueryOptionsRecord<GetPropertyResponseRecord, ApiErrorResponseRecord>
): UseQueryResult<GetPropertyResponseRecord, ApiErrorResponseRecord> =>
  useQuery({
    queryKey: [ReactQueryKeys.PROPERTIES, id],
    queryFn: async () => await getProperty(id),
    refetchOnWindowFocus: false,
    ...options,
  });
