import { Home, MapPin, Square } from "lucide-react";
import { useState, type FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card/content";
import { CardFooter } from "@/components/ui/card/footer";
import { CardHeader } from "@/components/ui/card/header";
import { CardTitle } from "@/components/ui/card/title";
import { Span } from "@/components/ui/typography/span";
import type { PropertyResponseRecord } from "@/services/properties/types";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type PropertyCardProps = {
  property: PropertyResponseRecord;
  onReadMore: (property: PropertyResponseRecord) => void;
};

export const PropertyCard: FC<PropertyCardProps> = ({ property, onReadMore }) => {
  const [imageError, setImageError] = useState(false);
  const showFallback = !property.imageUrl || imageError;

  return (
    <Card
      variant="default"
      className={joinClasses(
        "group h-full cursor-pointer overflow-hidden transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-2xl",
        "hover:ring-2 hover:ring-blue-500/20 dark:hover:ring-blue-400/20",
        "p-0"
      )}
      onClick={() => onReadMore(property)}
    >
      {/* Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {showFallback ? (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30">
            <Home className="h-16 w-16 text-gray-400 dark:text-gray-500" />
          </div>
        ) : (
          <img
            src={property.imageUrl || ""}
            alt={property.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className={joinClasses(
              "h-full w-full object-cover transition-transform duration-300",
              "group-hover:scale-105"
            )}
          />
        )}
      </div>

      <CardHeader className="px-6 pt-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg">{property.title}</CardTitle>
          <Badge variant="outline">{property.source}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-6">
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

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
          {property.priceDisplay}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6">
        <Button
          variant="solid"
          color="primary"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onReadMore(property);
          }}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};
