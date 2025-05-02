// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  ENV_MODE: "development",
  APP_VERSION: "1.0.0",
  LS_SECRET: "NOT USED",
  CRYPTO_SECRET: "NOT USED",

  // for login, login otp resend
  BP_PK_LOGIN: "pk_4a18fb1c-5b77-40d6-a2cc-77f98ea28fe4",

  // for register & leads register
  BP_PK_EGY_REGISTER: "pk_4a18fb1c-5b77-40d6-a2cc-77f98ea28fe4",
  BP_PK_INT_REGISTER: "pk_6ae96d14-cebf-4479-a7ba-042b3501b7d1",

  // for otp verification for login and register
  BP_PK_EGY_OTP_VERIFY: "pk_4a18fb1c-5b77-40d6-a2cc-77f98ea28fe4",
  BP_PK_INT_OTP_VERIFY: "pk_6ae96d14-cebf-4479-a7ba-042b3501b7d1",

  // for resend otp for register
  BP_PK_EGY_OTP_RESEND: "pk_8fc882f1-7a5f-44fa-a09a-8d595291e808",
  BP_PK_INT_OTP_RESEND: "pk_6ae96d14-cebf-4479-a7ba-042b3501b7d1",

  // for all forget password requests (including otp verify & resend)
  BP_PK_EGY_FORGET_PASSWORD: "pk_ff3d232d-c40e-4362-9168-da0bb7e1723f",
  BP_PK_INT_FORGET_PASSWORD: "pk_6ae96d14-cebf-4479-a7ba-042b3501b7d1",
  
  GTM_ID: "GTM-T9JNXZG"
};
