"use client";
import React, { FC, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import style from "./map.module.scss";
type PointMapPropType = {
  center: { lat: number; lng: number };
  name: string;
  address: string;
};

const PointMap: FC<PointMapPropType> = ({ center, name, address }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });
  const [isInfoOpen, setInfoOpen] = useState(false);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={style.container}
      center={center}
      zoom={15}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      <Marker
        position={center}
        onClick={() => {
          setInfoOpen(true);
        }}
      >
        {isInfoOpen && (
          <InfoWindow
            position={center}
            onCloseClick={() => {
              setInfoOpen(false);
            }}
          >
            <p className={style.info}>
              <span className={style.cafeName}>{name}</span>
              <span className={style.cafeAddress}>{address}</span>
            </p>
          </InfoWindow>
        )}
      </Marker>
    </GoogleMap>
  ) : null;
};

export default React.memo(PointMap);
