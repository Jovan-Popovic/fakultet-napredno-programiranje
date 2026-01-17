import { Home, MapPin, Square } from "lucide-react";
import type { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardFooter } from "@/components/ui/card/footer";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";
import { Span } from "@/components/ui/typography/span";
import type { PropertyResponseRecord } from "@/services/properties/types";

export type PropertyCardProps = {
  property: PropertyResponseRecord;
  onReadMore: (property: PropertyResponseRecord) => void;
};

export const PropertyCard: FC<PropertyCardProps> = ({ property, onReadMore }) => {
  return (
    <Card variant="default" className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg">{property.title}</CardTitle>
          <Badge variant="outline">{property.source}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <Span className="truncate">
            {property.location}, {property.city}
          </Span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {property.propertyType && (
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4 text-gray-500" />
              <Span>{property.propertyType}</Span>
            </div>
          )}
          {property.areaDisplay && (
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4 text-gray-500" />
              <Span>{property.areaDisplay}</Span>
            </div>
          )}
          {property.rooms && (
            <Span className="text-gray-600 dark:text-gray-400">
              {property.rooms} {property.rooms === 1 ? "room" : "rooms"}
            </Span>
          )}
        </div>

        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {property.priceDisplay}
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="solid" color="primary" className="w-full" onClick={() => onReadMore(property)}>
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};
