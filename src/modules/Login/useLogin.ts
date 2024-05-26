import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import client, { ApiError } from "../../client/ApiClient";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../../contexts/AuthContext";
import { Token } from "../../utils/getAccessToken";
import { LoginSchemaType } from "./schema";

const sendLogin = (payload: LoginSchemaType) =>
  client.post("/login", {
    body: JSON.stringify(payload),
  });

const useLogin = () => {
  const mutation = useMutation(sendLogin, {
    onSuccess: async (data) => {
      const tokenObj = (await data.json()) as Token;
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, tokenObj.access_token);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokenObj.refresh_token);
    },
    onError: ({ body }: ApiError) => {
      if (body?.message) {
        toast.error(body.message);
      } else {
        toast.error(`Login error`);
      }
    },
  });

  return {
    ...mutation,
  };
};

export default useLogin;
