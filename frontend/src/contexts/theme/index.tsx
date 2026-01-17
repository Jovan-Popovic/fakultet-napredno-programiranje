import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocalStorage } from "react-use";

/**
 * Available theme options.
 */
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

type ThemeProviderState = {
  /** The user‑selected theme */
  theme: Theme;
  /** The resolved theme that's actually being displayed (resolves SYSTEM to LIGHT or DARK) */
  resolvedTheme: Theme;
  /** Persist the user choice. */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark themes */
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeProviderState | null>(null);
const { Provider } = ThemeContext;

type Props = {
  children: ReactNode;
  /** Initial theme when no value exists in localStorage */
  defaultTheme?: Theme;
};

export const ThemeProvider = ({ children, defaultTheme = Theme.SYSTEM }: Props) => {
  const [theme = defaultTheme, setTheme] = useLocalStorage<Theme>("user-theme", defaultTheme);

  /**
   * Resolve the actual UI theme that should be applied to the document
   * based on the current preference.
   */
  const resolveTheme = useCallback((theme: Theme): Theme => {
    if (theme !== Theme.SYSTEM) return theme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.DARK : Theme.LIGHT;
  }, []);

  /** Track the resolved theme in state so it updates when system preference changes */
  const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => resolveTheme(theme));

  /**
   * Handle DOM updates **and** OS‑level changes in a single effect.
   */
  useEffect(() => {
    const root = document.documentElement;

    // Apply current resolved theme to the document root and update state.
    const applyTheme = (value: Theme) => {
      root.classList.remove(Theme.LIGHT, Theme.DARK);
      root.classList.add(value);
      setResolvedTheme(value);
    };

    // Initial paint.
    const initialResolved = resolveTheme(theme);
    applyTheme(initialResolved);

    // When the preference is `system`, subscribe to OS changes.
    let media: MediaQueryList | null = null;
    const handleMediaChange = (ev: MediaQueryListEvent) => {
      applyTheme(ev.matches ? Theme.DARK : Theme.LIGHT);
    };

    if (theme === Theme.SYSTEM) {
      media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", handleMediaChange);
    }

    return () => {
      media?.removeEventListener("change", handleMediaChange);
    };
  }, [resolveTheme, theme]);

  /** Memoize setter so that consumers won't re‑render unnecessarily. */
  const handleThemeChange = useCallback((value: Theme) => setTheme(value), [setTheme]);

  /** Toggle between light and dark themes */
  const toggleTheme = useCallback(() => {
    switch (theme) {
      case Theme.SYSTEM: {
        // When 'system', toggle to the opposite of what system currently shows
        const currentResolved = resolveTheme(theme);
        setTheme(currentResolved === Theme.DARK ? Theme.LIGHT : Theme.DARK);
        break;
      }

      case Theme.DARK:
        setTheme(Theme.LIGHT);
        break;
      case Theme.LIGHT:
        setTheme(Theme.DARK);
        break;
    }
  }, [theme, setTheme, resolveTheme]);

  return (
    <Provider value={{ theme, resolvedTheme, setTheme: handleThemeChange, toggleTheme }}>
      {children}
    </Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
