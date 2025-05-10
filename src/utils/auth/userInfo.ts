import { LOCAL_STORAGE_KEYS } from "../../constants/local-storage-keys";
import { getFromLocalStorage } from "../manageLocalStorage";

export const userInfo = () => {

  const {
    LOGO_URL: logo,
    FIRST_NAME: firstName,
    LAST_NAME: lastName,
    NAME: name,
    PROFILE_TYPE: profileType
  } = Object.fromEntries(
    Object.entries(LOCAL_STORAGE_KEYS).map(([key, value]) => [key, getFromLocalStorage(value) || ""])
  );

  const shortName = lastName ?
    firstName[0] + lastName[0] :
    firstName.slice(0, 2);

  return {
    logo,
    firstName,
    lastName,
    name,
    shortName,
    profileType
  }
};