import type { FC } from "react";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { Title } from "@/components/ui/typography/title";
import { PropertiesList } from "@/features/properties/components/properties-list";

export const PropertiesPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Title level={1} className="text-4xl font-bold">
            Property Listings
          </Title>
          <Paragraph className="mt-2 text-gray-600 dark:text-gray-400">
            Browse properties from Estitor and Realitica
          </Paragraph>
        </div>
        <ThemeSwitcher />
      </div>

      <PropertiesList />
    </div>
  );
};
