import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import client, { ApiError } from "../../client/ApiClient";
import { SignUpSchemaType } from "./schema";

const sendSignup = (payload: SignUpSchemaType) =>
  client.post("/register", {
    body: JSON.stringify(payload),
  });

const useSignup = () => {
  const router = useRouter();

  const mutation = useMutation(sendSignup, {
    onSuccess: () => {
      toast.success(
        `Signup successful. You can now login using credentials you passed during signup`,
        {
          duration: 6000,
        }
      );
      router.push("/login");
    },
    onError: ({ body }: ApiError) => {
      if (body?.message) {
        toast.error(body.message);
      } else {
        toast.error(`Signup error`);
      }
    },
  });

  return {
    ...mutation,
  };
};

export default useSignup;
