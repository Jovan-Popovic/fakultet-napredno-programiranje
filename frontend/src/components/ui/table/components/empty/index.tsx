import { SearchX } from "lucide-react";
import { type FC } from "react";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type Props = {
  className?: string;
  iconClassName?: string;
  text?: string;
};

export const EmptyData: FC<Props> = ({
  className = "w-full",
  iconClassName = "",
  text = "No data available",
}) => (
  <div className={joinClasses(className, "flex flex-col items-center justify-center py-3")}>
    <div className="mb-4 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800/50 dark:to-gray-900/50">
      <SearchX
        className={joinClasses(iconClassName, "theme-transition text-gray-400 dark:text-gray-500")}
      />
    </div>
    <div className="theme-transition text-center text-base font-medium text-gray-700 dark:text-gray-300">
      {text}
    </div>
    <div className="mt-1 text-center text-sm text-gray-500 dark:text-gray-500">
      Try adjusting your filters or search criteria
    </div>
  </div>
);
