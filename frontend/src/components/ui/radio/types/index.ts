import type { ReactNode } from "react";

export type Option = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  render?: (option: { value: string; label: ReactNode; isSelected: boolean }) => ReactNode;
};
