import { Monitor, Moon, Sun } from "lucide-react";
import { type FC } from "react";


import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu/checkbox-item";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu/content";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu/trigger";
import { Theme, useTheme } from "@/contexts/theme";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

const themeConfig = {
  [Theme.LIGHT]: {
    label: "Light",
    Icon: Sun,
  },
  [Theme.DARK]: {
    label: "Dark",
    Icon: Moon,
  },
  [Theme.SYSTEM]: {
    label: "System",
    Icon: Monitor,
  },
};

export const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const { Icon: CurrentIcon } = themeConfig[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={joinClasses(
            "theme-transition rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50",
            "dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
            "flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          )}
          aria-label="Toggle theme"
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline">{themeConfig[theme].label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="end">
        {Object.values(Theme).map((themeOption) => {
          const { label, Icon } = themeConfig[themeOption];
          return (
            <DropdownMenuCheckboxItem
              key={themeOption}
              checked={theme === themeOption}
              onCheckedChange={() => setTheme(themeOption)}
              className="cursor-pointer px-2 py-1.5 text-sm capitalize"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
