import type { FC } from "react";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Paragraph } from "@/components/ui/typography/paragraph";
import { Title } from "@/components/ui/typography/title";
import { PropertiesList } from "@/features/properties/components/properties-list";

export const PropertiesPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Title
              level={1}
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400"
            >
              Property Listings
            </Title>
          </div>
          <Paragraph className="mt-3 text-base text-gray-600 dark:text-gray-400">
            Discover your perfect property from our curated collection of real estate listings
            across Montenegro
          </Paragraph>
        </div>
        <ThemeSwitcher />
      </div>

      <PropertiesList />
    </div>
  );
};
