import { environment } from "../environments/environment";
import type { Country, PublicKeyType } from "../types/outer-layout";
import { COUNTRIES } from "./formValidations";

export const getPublicKey = (
  country: Country,
  type: PublicKeyType = "register"
) => {
  const publicKeysMap = {
    [COUNTRIES.EGY]: {
      login: environment.BP_PK_LOGIN,
      register: environment.BP_PK_EGY_REGISTER,
      verify: environment.BP_PK_EGY_OTP_VERIFY,
      resend: environment.BP_PK_EGY_OTP_RESEND,
      forget_password: environment.BP_PK_EGY_FORGET_PASSWORD,
    },
    default: {
      login: environment.BP_PK_LOGIN,
      register: environment.BP_PK_INT_REGISTER,
      verify: environment.BP_PK_INT_OTP_VERIFY,
      resend: environment.BP_PK_INT_OTP_RESEND,
      forget_password: environment.BP_PK_INT_FORGET_PASSWORD,
    },
  };

  const publicKeys = publicKeysMap[country] || publicKeysMap.default;
  const publicKey = publicKeys[type] as string;

  return publicKey;
};
