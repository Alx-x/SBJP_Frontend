import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthResource = () => {
  const state = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!state.isAuth) {
      router.push(`/login?path=${encodeURI(router.asPath)}`);
    }
  }, [router, state.isAuth]);
};

const useSession = () => {
  const state = useContext(AuthContext);
  return { ...state };
};

export default useSession;
