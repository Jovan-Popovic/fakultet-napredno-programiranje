import type { FC } from "react";

import { Paragraph } from "@/components/ui/typography/paragraph";
import { Title } from "@/components/ui/typography/title";
import { PropertiesList } from "@/features/properties/components/properties-list";

export const PropertiesPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Title level={1} className="text-4xl font-bold">
          Property Listings
        </Title>
        <Paragraph className="mt-2 text-gray-600 dark:text-gray-400">
          Browse properties from Estitor and Realitica
        </Paragraph>
      </div>

      <PropertiesList />
    </div>
  );
};
