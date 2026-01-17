import { useEffect } from "react";

/**
 * Custom hook to handle sidebar keyboard shortcuts.
 */
export const useSidebarKeyboard = (shortcut: string, toggleSidebar: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === shortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcut, toggleSidebar, enabled]);
};
