import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Generic query options record.
 *
 * Used to remove tanstack query v5's need to always pass this params,
 * as they are already defined inside hooks.
 */
export type QueryOptionsRecord<
  Response,
  Error,
  Keys extends readonly unknown[] = readonly unknown[],
> = Omit<UseQueryOptions<Response, Error, Response, Keys>, "queryKey" | "queryFn">;
