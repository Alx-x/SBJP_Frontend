import { useJsApiLoader } from "@react-google-maps/api";
import { clientEnv } from "../env/schema.mjs";

const mapLoaderOptions: Parameters<typeof useJsApiLoader>[0] = {
  id: "google-map-script",
  googleMapsApiKey: clientEnv.NEXT_PUBLIC_MAPS_KEY as string,
  libraries: ["drawing"],
};

export const containerStyles = {
  width: "100%",
  height: "100%",
};

export default mapLoaderOptions;
