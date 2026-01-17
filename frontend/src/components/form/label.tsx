import type { FC, ReactNode } from "react";

import { InfoTooltip } from "./info-tooltip";
import { RequiredAsterisk } from "./required-asterisk";

import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

type Props = {
  className?: string;
  htmlFor?: string;
  label?: ReactNode;
  required?: boolean;
  tooltip?: ReactNode;
};

export const Label: FC<Props> = ({ className, htmlFor, required, label, tooltip }) => (
  <>
    {label && (
      <label
        htmlFor={htmlFor}
        className={joinClasses(
          "text-secondary-1 theme-transition flex items-center gap-3 text-sm hover:cursor-pointer sm:text-base dark:text-white",
          className || ""
        )}
      >
        <span className="flex">
          {required && (
            <>
              <RequiredAsterisk />
            </>
          )}
          {label}
        </span>
        {tooltip && <InfoTooltip content={tooltip} />}
      </label>
    )}
  </>
);
