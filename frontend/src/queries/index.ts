import { QueryCache, QueryClient } from "@tanstack/react-query";

/**
 * Global query client
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({}),
});
