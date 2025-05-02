import { getCountryFromDomain } from "./getCountryFromDomain";
import { getFromLocalStorage, addToLocalStorage } from "./manageLocalStorage";

export const isXpenceUser = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const isXpenceFromParam = searchParams.get("xpence") === "true";
  const isXpenceFromLocalStorage = getFromLocalStorage("xpence");
  const isARE = getCountryFromDomain() === "ARE";

  if (isXpenceFromLocalStorage) {
    return isXpenceFromLocalStorage;
  } else if (isXpenceFromParam && isARE) {
    addToLocalStorage("xpence", "true");
    return true;
  } else {
    return false;
  }
}