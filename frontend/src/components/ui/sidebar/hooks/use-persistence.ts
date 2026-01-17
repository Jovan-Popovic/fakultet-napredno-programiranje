import { useCallback } from "react";

import type { SidebarConfigRecord } from "@/components/ui/sidebar/constants/config";
import { cookieManager } from "@/utils/data/cookie";

/**
 * Custom hook to handle sidebar state persistence via cookies.
 */
export const useSidebarPersistence = (config: SidebarConfigRecord) => {
  const persistSidebarState = useCallback(
    (isOpen: boolean) => {
      cookieManager.setCookie(config.cookieName, String(isOpen), {
        path: "/",
        maxAge: config.cookieMaxAge,
      });
    },
    [config.cookieName, config.cookieMaxAge]
  );

  const getSavedSidebarState = useCallback((): boolean | null => {
    const savedState = cookieManager.getCookie(config.cookieName);
    return savedState !== null ? savedState === "true" : null;
  }, [config.cookieName]);

  return {
    persistSidebarState,
    getSavedSidebarState,
  };
};
