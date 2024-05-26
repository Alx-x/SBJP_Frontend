import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useRouter } from "next/router.js";
import { useCallback, useState } from "react";
import mapLoaderOptions, {
  containerStyles,
} from "../../../consts/mapLoaderOptions";
import { DashboardSensorData, DashboardSensors } from "../types";
import SensorCard from "./SensorCard";

export default function SensorsMap({ data }: { data?: DashboardSensors }) {
  const router = useRouter();
  const [hoveredSensor, setHoveredSensor] = useState<
    DashboardSensorData["id"] | undefined
  >(data?.sensors[0]?.id);
  const selectedSensor = data?.sensors.find(({ id }) => id === hoveredSensor);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader(mapLoaderOptions);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: selectedSensor?.location_y || 0,
      lng: selectedSensor?.location_x || 0,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyles}
      onUnmount={onUnmount}
      onLoad={onLoad}
      zoom={6}
    >
      <>
        {data?.sensors.map(({ id, location_x, location_y, name }) => (
          <Marker
            key={id}
            label={name}
            position={{
              lat: location_y,
              lng: location_x,
            }}
            onClick={() => router.push(`/sensor/${id}`)}
            onMouseOver={() => setHoveredSensor(id)}
            onMouseOut={() => setHoveredSensor(undefined)}
          >
            {hoveredSensor === id && selectedSensor && (
              <InfoWindow>
                <div className="light">
                  <SensorCard {...selectedSensor} />
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </>
    </GoogleMap>
  ) : null;
}
