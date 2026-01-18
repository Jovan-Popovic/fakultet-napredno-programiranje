/**
 * @module PropertiesHooks
 *
 * @description
 * Provides React Query hooks for interacting with properties service.
 */
import { type UseMutationResult, type UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";

import type { QueryOptionsRecord } from "./types/query";

import type { ApiErrorResponseRecord } from "@/api/types/errors";
import { useNotifications } from "@/components/ui/notifications/context";
import { ReactQueryKeys } from "@/queries/keys/queries";
import { propertiesService } from "@/services/properties";
import type {
  ExportPropertiesRequestRecord,
  GetCitiesResponseRecord,
  GetPaginatedPropertiesRequestRecord,
  GetPaginatedPropertiesResponseRecord,
  GetPlatformsResponseRecord,
  GetPropertyResponseRecord,
} from "@/services/properties/types";
import { fileManager } from "@/utils/file";

const { getPaginatedProperties, getProperty, getCities, getPlatforms, exportPropertiesToCSV } = propertiesService;

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

export const useCities = (
  options?: QueryOptionsRecord<GetCitiesResponseRecord, ApiErrorResponseRecord>
): UseQueryResult<GetCitiesResponseRecord, ApiErrorResponseRecord> =>
  useQuery({
    queryKey: [ReactQueryKeys.PROPERTIES, "cities"],
    queryFn: async () => await getCities(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    ...options,
  });

export const usePlatforms = (
  options?: QueryOptionsRecord<GetPlatformsResponseRecord, ApiErrorResponseRecord>
): UseQueryResult<GetPlatformsResponseRecord, ApiErrorResponseRecord> =>
  useQuery({
    queryKey: [ReactQueryKeys.PROPERTIES, "platforms"],
    queryFn: async () => await getPlatforms(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    ...options,
  });

export const useExportProperties = (): UseMutationResult<
  void,
  ApiErrorResponseRecord,
  ExportPropertiesRequestRecord
> => {
  const { success, error } = useNotifications();

  return useMutation({
    mutationFn: async (filters: ExportPropertiesRequestRecord) => {
      const blob = await exportPropertiesToCSV(filters);

      // Generate filename from response headers or fallback
      const timestamp = new Date().toISOString().split("T")[0].replace(/-/g, "");
      const filename = `properties_export_${timestamp}.csv`;

      // Trigger download
      fileManager.downloadBlob(blob, filename);
    },
    onSuccess: () => {
      success({ message: "Properties exported successfully" });
    },
    onError: (err) => {
      const errorMessage =
        typeof err.detail === "string"
          ? err.detail
          : "Failed to export properties. Please try again.";
      error({
        message: errorMessage,
      });
    },
  });
};
