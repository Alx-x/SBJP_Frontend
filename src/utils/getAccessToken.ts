import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../contexts/AuthContext";

export type Token = {
  access_token: string;
  refresh_token: string;
};

export const getRefreshToken = () =>
localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

export const getAuthorizationHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export default getAccessToken;
