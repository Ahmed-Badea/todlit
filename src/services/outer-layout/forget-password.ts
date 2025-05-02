import { Axios } from "@app/tools/axios/axiosInstance";
// import { getBotPoison } from "@app/utils/botPoison";
import { getFromLocalStorage } from "@app/utils/manageLocalStorage";

const signupPhoneToken = getFromLocalStorage("signup_by_phone_token");

export const checkUser = async (usernameOrPhone: string) => {
  // const botPoison = await getBotPoison("forget_password");

  const reqBody = {
    username: usernameOrPhone,
    // "_botpoison": botPoison,
  };

  return Axios.post(`/api/auth/reset_pass/request_otp`, reqBody);
};

export const forgetPasswordSubmitPhone = async (phoneNumber: string) => {
  // const botPoison = await getBotPoison("forget_password");

  const reqBody = {
    phone_number: phoneNumber,
    token: signupPhoneToken,
    // "_botpoison": botPoison,
  };

  return Axios.post(`/api/auth/reset_pass/input_phone_number`, reqBody);
};

export const forgetPasswordVerifyOtp = async (otp: string) => {
  // const botPoison = await getBotPoison("forget_password");

  const reqBody = {
    otp: otp,
    token: signupPhoneToken,
    // "_botpoison": botPoison,
  };

  return Axios.post(`/api/auth/reset_pass/verify_otp`, reqBody);
};

export const resetPassword = (password: string) => {
  const reqBody = {
    password: password,
    token: signupPhoneToken,
  };

  return Axios.post(`/api/auth/reset_pass/reset_password_otp`, reqBody);
};
