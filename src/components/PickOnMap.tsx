import {
  DrawingManager,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import mapLoaderOptions, { containerStyles } from "../consts/mapLoaderOptions";

export default function PickOnMap({
  setLocation,
}: {
  setLocation: (lat: number, lng: number) => void;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [lastMarker, setLastMarker] = useState<google.maps.Marker | null>(null);

  const { isLoaded } = useJsApiLoader(mapLoaderOptions);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 0,
      lng: 0,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const markerCompleteHandler = (marker: google.maps.Marker) => {
    const pos = marker.getPosition();
    if (!!pos) {
      lastMarker?.setMap(null);
      setLastMarker(marker);
      setLocation(pos.lat(), pos.lng());
    } else {
      toast.error("Can't set location");
    }
  };

  const drawingMangerLoadHandler = (
    drawingManager: google.maps.drawing.DrawingManager
  ) => {
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyles}
      onUnmount={onUnmount}
      onLoad={onLoad}
    >
      <DrawingManager
        onLoad={drawingMangerLoadHandler}
        onMarkerComplete={markerCompleteHandler}
        options={{
          drawingControlOptions: {
            drawingModes: [google.maps.drawing.OverlayType.MARKER],
          },
        }}
      />
    </GoogleMap>
  ) : null;
}
