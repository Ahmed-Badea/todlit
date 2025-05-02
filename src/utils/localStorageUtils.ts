import { getFromLocalStorage } from "./manageLocalStorage"

export const getLang = () => {
  return getFromLocalStorage("language");
}

export const getMerchantId = () => {
  return getFromLocalStorage("merchant_id");
}

export const getMerchantToken = () => {
  return getFromLocalStorage("token");
}