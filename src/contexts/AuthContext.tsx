import {
  useEffect,
  ReactNode,
  useState,
  createContext,
  useCallback,
} from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import getAccessToken from "../utils/getAccessToken";

export const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
export const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

type TokenProps = {
  is_admin: boolean;
} & JwtPayload;

export type Auth = {
  isAuth: boolean;
  isAdmin: boolean;
  checkToken: () => void;
  logout: () => void;
};

export const AuthContext = createContext<Auth>({
  isAdmin: false,
  isAuth: true,
  checkToken: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  };

  const checkToken = useCallback(() => {
    const accessToken = getAccessToken();
    if (!!accessToken) {
      const decoded = jwt_decode<TokenProps>(accessToken);

      if (decoded) {
        if (decoded?.exp) {
          setIsAuth(decoded?.exp * 1000 > new Date().getTime());
        }
        if (decoded?.is_admin) {
          setIsAdmin(decoded?.is_admin);
        }
      }
    } else {
      logout();
    }
  }, [setIsAuth, setIsAdmin]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    addEventListener("storage", checkToken);
    return () => removeEventListener("storage", checkToken);
  }, []);

  const state = {
    isAdmin,
    isAuth,
    checkToken,
    logout,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
