import type { FC, ReactNode } from "react";

type Props = {
  element: ReactNode;
};

export const MinimalLayout: FC<Props> = ({ element }) => <>{element}</>;
