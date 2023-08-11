import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { FC, useState } from "react";
import style from "@/src/components/maps/map.module.scss";
import { CoffeePointType } from "@/src/servicies/redux/slices/coffeepoints";
import Link from "next/link";
type PointsMapPropType = {
  points: CoffeePointType[];
};
export const PointsMap: FC<PointsMapPropType> = ({ points }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [center, setCenter] = useState({
    lat: points[0].geopoint.latitude,
    lng: points[0].geopoint.longitude,
  });
  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={style.container}
      center={center}
      zoom={10}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {points.map((point) => {
        const isOpen = point.id === openMarkerId;

        return (
          <MarkerF
            icon={svgMarker}
            position={{
              lat: point.geopoint.latitude,
              lng: point.geopoint.longitude,
            }}
            onClick={() => {
              setOpenMarkerId(point.id);
              setCenter({
                lat: point.geopoint.latitude,
                lng: point.geopoint.longitude,
              });
            }}
            key={point.id}
          >
            {isOpen && (
              <InfoWindow
                position={{
                  lat: point.geopoint.latitude,
                  lng: point.geopoint.longitude,
                }}
                onCloseClick={() => {
                  setOpenMarkerId(null);
                }}
              >
                <p className={style.info}>
                  <span className={style.cafeName}>{point.name}</span>
                  <span className={style.cafeAddress}>{point.address}</span>
                  <Link href={`coffee-points/${point.city}/${point.id}`}>
                    Go to coffee point
                  </Link>
                </p>
              </InfoWindow>
            )}
          </MarkerF>
        );
      })}
    </GoogleMap>
  ) : null;
};
