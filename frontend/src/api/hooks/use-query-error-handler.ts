import { useEffect } from "react";

import { useApiError } from "./use-api-error";

import type { ApiErrorResponseRecord } from "@/api/types/errors";

type UseQueryErrorHandlerParams = {
  isError: boolean;
  error: ApiErrorResponseRecord | null;
};

/**
 * Hook that automatically handles React Query errors by displaying notifications
 *
 * @description
 * It can be used with any React Query hook that might produce errors
 * that need to be displayed to the user.
 *
 * @example
 * ```tsx
 * const { data, isFetching, error, isError } = useQuery(...);
 * useQueryErrorHandler({ isError, error });
 * ```
 */
export const useQueryErrorHandler = ({ isError, error }: UseQueryErrorHandlerParams): void => {
  const { handleError } = useApiError();

  useEffect(() => {
    if (isError && error) handleError(error);
  }, [isError, error, handleError]);
};
