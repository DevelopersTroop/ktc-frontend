"use client";

import { useCheckout } from "@/context/CheckoutContext";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Component to handle map centering dynamically
const DynamicMapView = ({
  coordinates,
  onLoadingChange,
}: {
  coordinates?: LatLngExpression;
  onLoadingChange?: (isLoading: boolean) => void;
}) => {
  const { relocate } = useCheckout();
  const map = useMap();

  useEffect(() => {
    onLoadingChange?.(false);
    if (coordinates || (relocate && coordinates)) {
      // Trigger the map animation
      map.setView(coordinates, 12, { animate: true });

      setTimeout(() => {
        onLoadingChange?.(false);
      }, 700);
    }

    // return () => clearTimeout(timeOut)
  }, [coordinates, map, onLoadingChange, relocate]);

  return null;
};

const Map = () => {
  const { otherDealers, selectedDealerInfo } = useCheckout();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  // Memoize rendering of additional dealers' markers
  const renderMapContent = useMemo(() => {
    if (otherDealers?.length > 0) {
      return otherDealers.map((dealer, index) => {
        const markerIcon = new L.Icon({
          iconUrl:
            index < 2
              ? "/installer.svg"
              : index < 4
                ? "/mobile.svg"
                : "/top-rated.svg",
          iconSize: [30, 40] as L.PointExpression,
        });

        return (
          <Marker
            icon={markerIcon}
            key={index}
            position={dealer.coordinates as LatLngExpression}
          >
            <Popup>
              <p>{dealer?.Addressee || "Unknown Dealer"}</p>
            </Popup>
          </Marker>
        );
      });
    }
    return null;
  }, [otherDealers]);

  // Default marker icon for the nearest dealer
  const nearestMarkerIcon = new L.Icon({
    iconUrl: "/top-rated.svg",
    iconSize: [30, 40] as L.PointExpression,
  });

  // Default fallback coordinates
  const defaultCoordinates: LatLngExpression = [0, 0];

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={selectedDealerInfo?.coordinates || defaultCoordinates}
        zoom={selectedDealerInfo ? 12 : 2}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedDealerInfo?.coordinates && (
          <Marker
            icon={nearestMarkerIcon}
            position={selectedDealerInfo.coordinates as LatLngExpression}
          >
            <Popup>
              <p>{selectedDealerInfo?.Addressee || "Unknown Dealer"}</p>
            </Popup>
          </Marker>
        )}
        {renderMapContent}
        {/* Handle dynamic view updates */}
        {selectedDealerInfo && (
          <DynamicMapView
            onLoadingChange={handleLoadingChange}
            coordinates={selectedDealerInfo.coordinates as LatLngExpression}
          />
        )}
      </MapContainer>
      {/* Optional loading spinner */}

      {isLoading && (
        <div className="absolute left-0 top-0 z-[9999] flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.2)]">
          <ImSpinner size={38} className="animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};

export default Map;
