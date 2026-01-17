import type { FC } from "react";

import { CopyButton } from "@/components/ui/copy-button";

type Props = {
  content: string;
};

export const CopyButtonSuffix: FC<Props> = ({ content }) => <CopyButton content={content} />;
