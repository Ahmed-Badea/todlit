import { Axios } from "../../tools/axios/axiosInstance";
// import { getBotPoison } from "../../../utils/botPoison";

export const register = async ({
  firstName,
  lastName,
  email,
  phone,
  nurseryName,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nurseryName: string;
  password: string;
}) => {
  // const botPoison = await getBotPoison("register");

  const reqBody = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
    nursery_name: nurseryName,
    password: password,
    // "_botpoison": botPoison
  };

  return Axios.post(`/dashboard/register_nursery/`, reqBody);
};
