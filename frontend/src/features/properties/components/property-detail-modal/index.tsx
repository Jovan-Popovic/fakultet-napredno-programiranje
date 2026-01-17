import { Calendar, ExternalLink, Home, MapPin, Square } from "lucide-react";
import type { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog/components/content";
import { DialogFooter } from "@/components/ui/dialog/components/footer";
import { DialogHeader } from "@/components/ui/dialog/components/header";
import { DialogTitle } from "@/components/ui/dialog/components/title";
import { Span } from "@/components/ui/typography/span";
import type { PropertyResponseRecord } from "@/services/properties/types";

export type PropertyDetailModalProps = {
  property: PropertyResponseRecord | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PropertyDetailModal: FC<PropertyDetailModalProps> = ({ property, isOpen, onClose }) => {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <Span className="text-lg">
              {property.location}, {property.city}
            </Span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Price</div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {property.priceDisplay}
              </div>
              {property.priceEur && (
                <div className="text-sm text-gray-600">€{property.priceEur.toLocaleString()}</div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Details</div>
              <div className="space-y-1">
                {property.propertyType && (
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-gray-500" />
                    <Span>{property.propertyType}</Span>
                  </div>
                )}
                {property.areaDisplay && (
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4 text-gray-500" />
                    <Span>{property.areaDisplay}</Span>
                  </div>
                )}
                {property.rooms && (
                  <div className="flex items-center gap-2">
                    <Span className="font-medium">{property.rooms}</Span>
                    <Span className="text-gray-600">{property.rooms === 1 ? "room" : "rooms"}</Span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Source</div>
            <Badge variant="outline">{property.source}</Badge>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <Span>Listed {new Date(property.createdAt).toLocaleDateString()}</Span>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              variant="solid"
              color="primary"
              icon={ExternalLink}
              onClick={() => window.open(property.link, "_blank")}
              className="flex-1"
            >
              View Original Listing
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
