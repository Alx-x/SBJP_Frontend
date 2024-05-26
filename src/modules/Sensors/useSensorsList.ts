import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import client, { ApiError } from "../../client/ApiClient";
import {
  getAuthorizationHeader,
} from "../../utils/getAccessToken";
import { DashboardSensors } from "./types";

export const SENSORS_LIST_KEY = "SENSORS_LIST";

const getSensors = async () => {
  const res = await client.get("/map", {
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  return (await res.json()) as DashboardSensors;
};

const useSensorsList = () => {
  const query = useQuery({
    queryKey: [SENSORS_LIST_KEY],
    queryFn: getSensors,
    retry: 1,
    onError: ({ body }: ApiError) => {
      if (body?.message) {
        toast.error(body.message);
      } else {
        toast.error(`Error getting sensors list`);
      }
    },
  });

  return {
    ...query,
  };
};

export default useSensorsList;
