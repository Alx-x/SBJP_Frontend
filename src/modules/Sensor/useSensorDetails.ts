import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import client, { ApiError } from "../../client/ApiClient";
import { getAuthorizationHeader } from "../../utils/getAccessToken";
import { SensorData } from "./types";

export const SENSOR_KEY = "SENSOR";

const getSensor = async (id: number | string) => {
  const res = await client.get(`/sensor/${id}`, {
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  return (await res.json()) as SensorData;
};

const useSensorDetails = (id: number | string) => {
  const query = useQuery({
    queryKey: [SENSOR_KEY, id],
    queryFn: () => getSensor(id),
    retry: 1,
    onError: ({ body }: ApiError) => {
      if (body?.message) {
        toast.error(body.message);
      } else {
        toast.error(`Error getting sensor details`);
      }
    },
  });

  return {
    ...query,
  };
};

export default useSensorDetails;
