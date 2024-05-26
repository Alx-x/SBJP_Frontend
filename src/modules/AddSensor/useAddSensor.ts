import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import client, { ApiError } from "../../client/ApiClient";
import { getAuthorizationHeader } from "../../utils/getAccessToken";
import { AddSensorSchemaType } from "./schema";

export type AddSensorResponse = {
  api_key: string;
};

const postNewSensor = async ({
  name,
  location_x,
  location_y,
}: AddSensorSchemaType) => {
  const res = await client.post(`/sensor/${name}`, {
    body: JSON.stringify({
      location_x,
      location_y,
    }),
    headers: {
      ...getAuthorizationHeader(),
    },
  });
  return (await res.json()) as AddSensorResponse;
};

const useAddSensor = () => {
  const mutation = useMutation(postNewSensor, {
    onSuccess: () => {
      toast.success(`New sensor added successfuly`);
    },
    onError: ({ body }: ApiError) => {
      if (body?.message) {
        toast.error(body.message);
      } else {
        toast.error(`Error while adding new sensor`);
      }
    },
  });

  return {
    ...mutation,
  };
};

export default useAddSensor;
