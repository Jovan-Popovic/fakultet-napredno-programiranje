import { Calendar, ExternalLink, Home, MapPin, Square } from "lucide-react";
import { useState, type FC } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog/components/content";
import { DialogFooter } from "@/components/ui/dialog/components/footer";
import { DialogHeader } from "@/components/ui/dialog/components/header";
import { DialogTitle } from "@/components/ui/dialog/components/title";
import { Span } from "@/components/ui/typography/span";
import type { PropertyResponseRecord } from "@/services/properties/types";
import { classNameManager } from "@/utils/css";

const { joinClasses } = classNameManager;

export type PropertyDetailModalProps = {
  property: PropertyResponseRecord | null;
  isOpen: boolean;
  onClose: () => void;
};

export const PropertyDetailModal: FC<PropertyDetailModalProps> = ({ property, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!property) return null;

  const showFallback = !property.imageUrl || imageError;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={joinClasses(
          "max-w-3xl overflow-hidden bg-white/95 backdrop-blur-lg dark:bg-gray-900/95",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300"
        )}
      >
        {/* Hero Image Section */}
        <div className="-mx-6 -mt-6 mb-6 aspect-video w-[calc(100%+3rem)] overflow-hidden bg-gray-100 dark:bg-gray-800">
          {showFallback ? (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30">
              <Home className="h-24 w-24 text-gray-400 dark:text-gray-500" />
            </div>
          ) : (
            <img
              src={property.imageUrl || ""}
              alt={property.title}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          )}
        </div>

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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div
              className={joinClasses(
                "space-y-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4",
                "dark:from-blue-900/20 dark:to-purple-900/20"
              )}
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Price</div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
                {property.priceDisplay}
              </div>
              {property.priceEur && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  €{property.priceEur.toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Details</div>
              <div className="space-y-2">
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
                    <Span className="text-gray-600 dark:text-gray-400">
                      {property.rooms === 1 ? "room" : "rooms"}
                    </Span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Span className="text-sm text-gray-600 dark:text-gray-400">
                Listed {new Date(property.createdAt).toLocaleDateString()}
              </Span>
            </div>
            <Badge variant="outline">{property.source}</Badge>
          </div>

          <DialogFooter className="gap-2">
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
