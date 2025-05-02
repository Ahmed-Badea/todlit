import { getMerchantToken } from "../localStorageUtils";

export const checkAuthState = () => {
  const token = getMerchantToken();

  return token ? true : false;
}